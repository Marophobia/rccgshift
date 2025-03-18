import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const { id } = data;
    try {

        const settings = await prisma.settings.findFirst();

        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }
        
        const official = await prisma.officials.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                official_sessions: {
                    where: {
                        seasonId: settings.current_season,
                    },
                    include: {
                        department: true,
                    },
                },
            },

        });

        if (!official) {
            return errorHandler('Official Not Found', 404);
        }

        return sucessHandler('Active Official', 200, official);
    } catch (error) {
        console.log(error);
        return errorHandler(`Something went wrong: ${error}`);
    }
};
