import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {

    try {
        const settings = await prisma.settings.findFirst();

        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }

        const rounds = await prisma.round.findMany({
            where: {
                seasonId: settings.current_season
            },
            include: {
                users: true
            }
        });

        // if (!rounds || rounds.length < 1) {
        //     return errorHandler("No rounds found", 404)
        // }
        return sucessHandler("Active rounds", 200, rounds)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}