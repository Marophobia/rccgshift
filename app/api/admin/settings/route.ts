import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {
        const settings = await prisma.settings.findFirst();
        if (!settings) {
            return errorHandler("No settings found", 404)
        }
        return sucessHandler("Active settings", 200, settings)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}