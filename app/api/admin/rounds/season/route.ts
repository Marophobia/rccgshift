import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {

    const { seasonId } = await req.json()

    try {

        const rounds = await prisma.round.findMany({
            where: {
                seasonId: seasonId
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