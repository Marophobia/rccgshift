import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    const data = await req.json()
    const { id } = data
    try {
        const contestant = await prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!contestant) {
            return errorHandler("Contestant Not Found", 404)
        }

        return sucessHandler("Active Contestants", 200, contestant)

    } catch (error) {
        console.log(error)
        return errorHandler(`Something went wrong: ${error}`)
    }
}