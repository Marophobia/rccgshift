import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (
        !session ||
        (session.user.role !== 'judge1' &&
            session.user.role !== 'judge2' &&
            session.user.role !== 'judge3')
    ) {
        return errorHandler('Unauthenticated', 401); // 401 for unauthorized
    }

    const judgeId = session.user.role.slice(5);

    try {
        const settings = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });
        if (!settings) {
            return errorHandler('No settings found', 404);
        }

        const current_round = settings.current_round;

        const contestants = await prisma.round.findFirst({
            where: {
                id: current_round,
            },
            include: {
                users: true,
            },
        });

        if (!contestants) {
            return errorHandler('No contestant found', 404);
        }

        const concatStatus = 'status' + judgeId;

        const allVoted = contestants.users.every(
            (user) => (user as any)[concatStatus] === 'voted'
        );
        const anyPending = contestants.users.some(
            (user) =>
                (user as any)[concatStatus] === 'pending' ||
                (user as any)[concatStatus] === 'skipped'
        );

        const votingStatus = allVoted
            ? 'Finished'
            : anyPending
            ? 'ongoing'
            : 'pending';

        const data = { settings, votingStatus };

        return sucessHandler('Active settings', 200, data);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
