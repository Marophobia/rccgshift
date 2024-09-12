import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    const data = await req.json();
    const { qualifiers } = data;

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

        // Fetch and score the contestants
        const contestants = await prisma.user_session.findMany({
            where: {
                round_id: current_round,
            },
        });

        if (!contestants || contestants.length < 1) {
            console.error('No contestants found');
            return errorHandler('No contestants found', 404);
        }

        // Update the scores based on votes and judge votes
        const updatedContestants = await Promise.all(
            contestants.map(async (contestant) => {
                const voteScore =
                    contestant.votes / 100 > 40 ? 40 : contestant.votes / 100;
                const judgevotes =
                    contestant.judge_votes1 +
                    contestant.judge_votes2 +
                    contestant.judge_votes3;
                const totalScore = voteScore + judgevotes;

                await prisma.user_session.update({
                    where: { id: contestant.id },
                    data: { score: totalScore },
                });

                return { ...contestant, score: totalScore };
            })
        );

        // Sort contestants by score in descending order
        const sortedContestants = updatedContestants.sort(
            (a, b) => b.score - a.score
        );

        // If current round is the final round (round 5), select only the top 3
        if (current_round === 5) {
            const topThree = sortedContestants.slice(0, 3);
            const disqualified = sortedContestants.slice(3);

            // Update the database for the qualified and disqualified contestants
            await Promise.all(
                disqualified.map(async (contestant) => {
                    await prisma.user_session.update({
                        where: {
                            id: contestant.id,
                        },
                        data: {
                            qualified: false,
                        },
                    });
                })
            );

            // Assign positions: 1 (winner), 2 (first runner-up), 3 (second runner-up)
            await Promise.all(
                topThree.map(async (contestant, index) => {
                    await prisma.user_session.update({
                        where: { id: contestant.id },
                        data: { position: index + 1, qualified: true }, // 1 for winner, 2 for 1st runner-up, 3 for 2nd runner-up
                    });
                })
            );

            await prisma.settings.update({
                where: { id: round.id },
                data: { compiled: true },
            });

            return sucessHandler(
                'Top 3 contestants selected and positions updated',
                200,
                { topThree }
            );
        }

        // Get the score of the contestant at the last qualifying spot
        const lastQualifiedScore = sortedContestants[qualifiers - 1]?.score;

        // Select all contestants with a score >= lastQualifiedScore
        const topContestants = sortedContestants.filter(
            (contestant) => contestant.score >= lastQualifiedScore
        );

        const disqualified = sortedContestants.filter(
            (contestant) => contestant.score < lastQualifiedScore
        );

        // Update the database for the qualified and disqualified contestants
        await Promise.all(
            disqualified.map(async (contestant) => {
                await prisma.user_session.update({
                    where: {
                        id: contestant.id,
                    },
                    data: {
                        qualified: false,
                    },
                });
            })

        );

        await Promise.all(
            topContestants.map(async (contestant) => {
                await prisma.user_session.update({
                    where: {
                        id: contestant.id,
                    },
                    data: {
                        qualified: true,
                    },
                });
            })
        )

        await prisma.settings.update({
            where: { id: round.id },
            data: { compiled: true },
        });

        if (topContestants > qualifiers) {
            return sucessHandler(
                `More than ${qualifiers} contestants qualified because we had ties, Please check the round for more details`,
                200,
                { topContestants }
            );
        } else {
            return sucessHandler(
                'Top contestants selected and new round created',
                200,
                { topContestants }
            );
        }
    } catch (error) {
        console.error(error);
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
