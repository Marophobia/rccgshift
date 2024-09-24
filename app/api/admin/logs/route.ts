import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    try {
        const contestants = await prisma.logs.findMany({
            orderBy: {
                id: 'asc',
            },
        });

        if (!contestants || contestants.length < 1) {
            return errorHandler('No Logs found', 404,);
        }

        return sucessHandler('Data logs', 200, contestants);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
