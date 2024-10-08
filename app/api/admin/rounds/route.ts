import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {

    try {
        const rounds = await prisma.round.findMany({
            include: {
                users: true
            }
        });

        if (!rounds || rounds.length < 1) {
            return errorHandler("No rounds found", 404)
        }
        return sucessHandler("Active rounds", 200, rounds)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}