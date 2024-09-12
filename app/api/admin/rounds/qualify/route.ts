import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    const { user_id, id } = await req.json();

    try {
        // Fetch the current round from settings
        const round = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });

        if (!round) {
            return errorHandler('No round found', 404);
        }

        // Check if semi final
        if (round.current_round !== 4)
            return errorHandler(
                'This action is only permitted in Semi-final',
                403
            );

        // Fetch the user
        const contestant = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
        });

        // Make sure user exist and is valid
        if (!contestant) {
            return errorHandler('No contestant found', 404);
        }

        // if (contestant.status !== 'approved') {
        //     return errorHandler('Contestant is inactive', 401);
        // }

        // update the settings to qualified
        await prisma.user_session
            .update({
                where: {
                    id,
                },
                data: {
                    qualified: true,
                },
            })
            .catch((err) => {
                console.error(err);
                return errorHandler(`Something went wrong`, 500);
            });

        // Create a new session for user
        await prisma.user_session
            .create({
                data: {
                    user_id: user_id,
                    round_id: round.current_round,
                },
            })
            .catch((err) => {
                console.error(err);
                return errorHandler(`Something went wrong`, 500);
            });

        return sucessHandler(
            'Top contestants selected and new round created',
            200
        );
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
