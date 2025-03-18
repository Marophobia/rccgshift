import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {

        const settings = await prisma.settings.findFirst();

        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }

        const contestants = await prisma.user.findMany({
            where: {
                seasonId: settings.current_season,
                paid: 1,
                competitionType: 1
            },
            orderBy: {
                id: "asc",
            },
            include: {
                Season: true,
                Group: true,
            },
        });

        return sucessHandler("Active Contestants", 200, contestants)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}