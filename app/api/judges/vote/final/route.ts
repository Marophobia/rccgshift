import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import { getServerSession } from 'next-auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and has the correct role
    if (
        !session ||
        (session.user.role !== 'judge1' &&
            session.user.role !== 'judge2' &&
            session.user.role !== 'judge3')
    ) {
        return errorHandler('Unauthenticated', 401); // 401 for unauthorized
    }

    const judgeId = session.user.role.slice(5);
    const concatStatus = 'status' + judgeId;

    // Extract id and vote from the request body
    const { id, vote } = await req.json();

    // Validate input
    if (!id || vote === undefined) {
        return errorHandler('Missing Vote', 400); // Use 400 for bad request
    }

    try {
        // Check the current status of the contestant
        const contestant = await prisma.user_session.findUnique({
            where: { id: id },
        });

        if (!contestant) {
            return errorHandler('Contestant not found', 404);
        }

        // If the contestant's status is already "voted", do not update
        if ((contestant as any)[concatStatus] === 'voted') {
            return errorHandler('Vote already registered', 400);
        }

        if (judgeId === '1') {
            await prisma.user_session.update({
                where: { id: id }, // Ensure `id` is unique in the schema
                data: {
                    judge_votes1: {
                        increment: vote,
                    },
                    status1: 'voted',
                },
            });
        } else if (judgeId === '2') {
            await prisma.user_session.update({
                where: { id: id }, // Ensure `id` is unique in the schema
                data: {
                    judge_votes2: {
                        increment: vote,
                    },
                    status2: 'voted',
                },
            });
        } else {
            await prisma.user_session.update({
                where: { id: id }, // Ensure `id` is unique in the schema
                data: {
                    judge_votes3: {
                        increment: vote,
                    },
                    status3: 'voted',
                },
            });
        }

        return sucessHandler('Vote Registered', 200);
    } catch (error) {
        return errorHandler(
            `Something went wrong with the server: ${error}`,
            500
        );
    }
};
