import { errorHandler, sucessHandler } from "@/lib/functions";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
    try {
        const settings = await prisma.settings.findFirst({
            include: {
                round: true
            }
        });
        if (!settings) {
            return errorHandler("No settings found", 404);
        }

        const current_round = settings.current_round;

        const contestants = await prisma.round.findFirst({
            where: {
                id: current_round
            },
            include: {
                users: true
            }
        });

        if (!contestants) {
            return errorHandler("No contestant found", 404);
        }

        const allVoted = contestants.users.every(user => user.status === 'voted');
        const anyPending = contestants.users.some(user => user.status === 'pending' || user.status === 'skipped');

        const votingStatus = allVoted ? 'Finished' : anyPending ? 'ongoing' : 'pending';

        const data = { settings, votingStatus };

        return sucessHandler("Active settings", 200, data);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};

