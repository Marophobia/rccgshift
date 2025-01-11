import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {
        const seasons = await prisma.season.findMany({
            orderBy: {
                id: "asc"
            }
        });
        if (!seasons || seasons.length < 1) {
            return errorHandler("No seasons found", 404)
        }
        return sucessHandler("All Seasons", 200, seasons)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}