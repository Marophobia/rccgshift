import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: Request) => {

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler("Unauthenticated", 404);
    }

    try {
        const data = await req.json();
        const {
            type,
            id,
        } = data;

        let query;

        switch (type) {
            case "approve":
                query = prisma.user.update({
                    where: { id: id }, data: { status: 'approved' }
                })
                break;

            case "disqualify":
                query = prisma.user.update({
                    where: { id: id }, data: { status: 'registered' }
                })
                break;

            case "deleteUser":
                query = prisma.user.delete({
                    where: { id: id }
                })
                break;

            default:
                return errorHandler("Something went Wrong", 404)
        }

        const run = await query
        if (run) {
            return sucessHandler("Updated", 200)
        }

    } catch (error) {
        console.error('Error processing the request:', error);
        return errorHandler(`Something went wrong: ${error}`)
    }
}
