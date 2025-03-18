import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const { id } = data;
    try {

        const reports = await prisma.reports.findMany({
            where: {
                authorId: Number(id),
            },
            include: {
                author: true,
            },

        });

        if (!reports) {
            return sucessHandler('Reports', 200, reports);
        }

        return sucessHandler('Reports', 200, reports);
        
    } catch (error) {
        console.log(error);
        return errorHandler(`Something went wrong: ${error}`);
    }
};
