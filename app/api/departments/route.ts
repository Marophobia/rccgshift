import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"

export const POST = async (req: Request) => {
    try {
        const departments = await prisma.departments.findMany({
            orderBy: {
                id: "asc"
            }
        });

        if (!departments || departments.length < 1) {
            return errorHandler("No departments found", 404)
        }
        
        return sucessHandler("All Departments", 200, departments)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}