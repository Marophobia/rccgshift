import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: Request) => {
    try {

        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return errorHandler('Unauthenticated', 404);
        }
        const data = await req.json();
        const {
            id,
            name,
            phone,
            gender,
            region,
            province
        } = data;

        if (!id) {
            return errorHandler("Missing 'id' parameter", 400);
        }

        const settings = await prisma.settings.findFirst();

        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }

        await prisma.user.update({
            where: { id },
            data: {
                name,
                telephone: phone,
                gender,
                region,
                province,
                seasonId: settings.current_season,
            },
        });

        return sucessHandler("Contestant Edited", 200)

    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}