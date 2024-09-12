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

        if (round.competition === 1) {

            if (current_round === 5) {

                // Update the database for the qualified and disqualified contestants
                await prisma.round.update({
                    where: { id: current_round },
                    data: { qualifiers: 1, status: false },
                });

                await prisma.settings.update({
                    where: { id: round.id },
                    data: { competition: 2 },
                });

                return sucessHandler(
                    'Final Results Published',
                    200
                );
            }

            // Update the current round in settings
            const newRound = current_round + 1
            await prisma.settings.update({
                where: { id: round.id },
                data: { current_round: newRound, compiled: false },
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
        } else if (!round.competition) {

            const contestants = await prisma.user.findMany();

            await prisma.settings.update({
                where: { id: round.id },
                data: { current_round: 1, competition: 1, compiled: false },
            });

            // Create new user sessions for all contestants in the new round
            const newSessions = await Promise.all(
                contestants.map(async (contestant) => {

                    // Create new session in the new round for the qualifiers
                    return await prisma.user_session.create({
                        data: {
                            user_id: contestant.id,
                            round_id: 1,
                        },
                    });
                })
            );

            return sucessHandler(
                'Round Created',
                200
            );
        } else {
            return errorHandler(`Competition has ended`, 404);
        }

    } catch (error) {
        console.error(error);
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
