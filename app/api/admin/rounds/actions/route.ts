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
            case "activate":
                query = prisma.round.update({
                    where: { id: id }, data: { status: true }
                })
                break;

            case "disable":
                query = prisma.round.update({
                    where: { id: id }, data: { status: false }
                })
                break;

            default:
                return errorHandler("Something went Wrong", 404)
        }

        const settings = await prisma.settings.findFirst()
        if (settings?.current_round === id) {
            const run = await query
            if (run) {
                return sucessHandler("Updated", 200)
            }
        } else {
            return errorHandler("Round not the active round", 401)
        }

    } catch (error) {
        console.error('Error processing the request:', error);
        return errorHandler(`Something went wrong: ${error}`)
    }
}
