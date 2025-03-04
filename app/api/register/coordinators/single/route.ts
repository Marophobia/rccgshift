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


        const official = await prisma.officials.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                official_sessions: {
                    where: {
                        seasonId: settings?.current_season
                    }
                }
            }
        });

        if (!official) {
            return errorHandler('No official found', 404);
        }

        if (!settings) {
            return errorHandler('No settings found', 404);
        }

        const data = { official, settings };

        return sucessHandler('Active Officials', 200, data);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
