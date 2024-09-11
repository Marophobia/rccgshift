import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    try {
        // Fetch the current round from settings
        const round = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });

        if (!round) {
            console.error('No round found');
            return errorHandler('No round found', 404);
        }

        const current_round = round.current_round;
        // Update the current round in settings
        const newRound = current_round + 1;
        await prisma.settings.update({
            where: { id: round.id },
            data: { current_round: newRound },
        });

        await prisma.round.update({
            where: { id: current_round },
            data: { qualifiers: 1, status: false },
        });

        const topContestants = await prisma.user_session.findMany({
            where: {
                round_id: current_round,
                qualified: true,
            },
        });

        // Create new user sessions for the top contestants in the new round
        const newSessions = await Promise.all(
            topContestants.map(async (contestant) => {
                // Update qualifiers status in the concluded round
                await prisma.user_session.update({
                    where: {
                        id: contestant.id,
                    },
                    data: {
                        qualified: true,
                    },
                });

                // Create new session in the new round for the qualifiers
                return await prisma.user_session.create({
                    data: {
                        user_id: contestant.user_id,
                        round_id: newRound,
                    },
                });
            })
        );
        return sucessHandler(
            'Top contestants selected and new round created',
            200,
            { topContestants, newSessions }
        );
    } catch (error) {
        console.error(error);
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
