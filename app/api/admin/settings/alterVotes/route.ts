import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import { getServerSession } from 'next-auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 401);
    }

    const data = await req.json();
    const { id, vote } = data;
    if (!id || vote === undefined) {
        return errorHandler('Missing Vote or id', 400);
    }

    // Verify transaction with Paystack
    try {
        // Proceed to update the database
        const current_round = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });

        if (current_round?.round.status) {
            // Fetch the user with user_sessions included
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user_sessions: true,
                },
            });
            if (!user) {
                return errorHandler('User not found', 404);
            }

            const userCurrentSession = await prisma.user_session.findFirst({
                where: {
                    user_id: id,
                    round_id: current_round.current_round,
                },
            });

            const update = await prisma.user_session
                .update({
                    where: {
                        id: userCurrentSession?.id,
                    },
                    data: {
                        votes: vote,
                    },
                })
                .catch((e) => {
                    console.log(`Unable to update vote: ${e}`);
                    return errorHandler(`Unable to update vote: ${e}`);
                });
        }
        return sucessHandler('Vote Successful', 201);
    } catch (error) {
        return errorHandler(`Something went wrong with the server: ${error}`);
    }
};
