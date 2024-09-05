import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {
        const settings = await prisma.settings.findFirst({
            include: {
                round: true
            }
        });
        if (!settings) {
            return errorHandler("No settings found", 404)
        }

        const current_round = settings.current_round

        const contestants = await prisma.round.findFirst({
            where: {
                id: current_round
            },
            include: {
                users: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        });

        if (!contestants) {
            return errorHandler("No Contestant found", 404)
        }

        return sucessHandler("Active settings", 200, contestants)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}