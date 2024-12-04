import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    
    try {
        const pastors = await prisma.provincialPastor.findMany({
            orderBy: {
                region: 'asc',
            },
        })

        if (!pastors || pastors.length < 1) {
            return errorHandler('No pastors found', 404);
        }

        return sucessHandler('Active pastors', 200, pastors)

    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
}
