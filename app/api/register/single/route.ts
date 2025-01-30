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


        const contestant = await prisma.user.findFirst({
            where: {
                id: Number(id),
                seasonId: settings?.current_season
            },
            include: {
                Group: true
            }
        });

        if (!contestant) {
            return errorHandler('No contestant found', 404);
        }

        if (!settings) {
            return errorHandler('No contestant found', 404);
        }

        const data = { contestant, settings };

        return sucessHandler('Active Contestants', 200, data);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
