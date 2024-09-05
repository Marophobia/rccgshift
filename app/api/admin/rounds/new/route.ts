import { errorHandler, sucessHandler } from "@/lib/functions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler("Unauthenticated", 404);
    }

    const data = await req.json();
    const { qualifiers } = data;

    try {
        // Fetch the current round from settings
        const round = await prisma.settings.findFirst({
            include: {
                round: true
            }
        });

        if (!round) {
            return errorHandler("No round found", 404);
        }

        const current_round = round.current_round;

        // Fetch and score the contestants
        const contestants = await prisma.user_session.findMany({
            where: {
                round_id: current_round
            }
        });

        if (!contestants || contestants.length < 1) {
            return errorHandler("No contestants found", 404);
        }

        // Update the scores based on votes and judge votes
        const updatedContestants = await Promise.all(contestants.map(async (contestant) => {
            const voteScore = contestant.votes / 100 > 40 ? 40 : contestant.votes / 100;
            const totalScore = voteScore + contestant.judge_votes;

            await prisma.user_session.update({
                where: { id: contestant.id },
                data: { score: totalScore },
            });

            return { ...contestant, score: totalScore };
        }));

        // Sort contestants by score in descending order
        const sortedContestants = updatedContestants.sort((a, b) => b.score - a.score);

        // Select the top `qualifiers` contestants
        const topContestants = sortedContestants.slice(0, qualifiers);

        // Update the current round in settings
        const newRound = current_round + 1;
        await prisma.settings.update({
            where: { id: round.id },
            data: { current_round: newRound }
        });

        // Create new user sessions for the top contestants in the new round
        const newSessions = await Promise.all(topContestants.map(async (contestant) => {
            return await prisma.user_session.create({
                data: {
                    user_id: contestant.user_id,
                    round_id: newRound,
                    score: 0, // Reset score for the new round
                    votes: 0, // Reset votes for the new round
                    judge_votes: 0, // Reset judge votes for the new round
                }
            });
        }));

        return sucessHandler("Top contestants selected and new round created", 200, { topContestants, newSessions });

    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
