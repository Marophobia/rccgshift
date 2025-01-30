import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {

    const { seasonId } = await req.json();
    try {

        const contestants = await prisma.user.findMany({
            where: {
                seasonId: seasonId,
                paid: 1
            },
            orderBy: {
                id: "asc",
            },
            include: {
                Season: true,
                Group: true
            },
        });

        return sucessHandler("Active Contestants", 200, contestants)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}