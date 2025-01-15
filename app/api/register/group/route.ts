import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const { id } = data;

    try {

        const settings = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });


        const group = await prisma.group.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                GroupMembers: true,
                User: true
            }
        });


        if (!group) {
            return errorHandler('Group not found', 404);
        }

        if (!settings) {
            return errorHandler('Group not found', 404);
        }

        const data = { group, settings };

        return sucessHandler('Active Groups', 200, data);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
