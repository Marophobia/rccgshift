import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {
        const judges = await prisma.admin.findMany({
            where: {
                role: 'judge'
            },
            orderBy: {
                id: "desc"
            }
        });
        if (!judges || judges.length < 1) {
            return errorHandler("No judges found", 404)
        }
        return sucessHandler("Active judges", 200, judges)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}