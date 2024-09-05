import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { roleCheck } from "@/lib/role";

export const POST = async (req: NextApiRequest) => {

    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return errorHandler("Unauthenticated", 404)
    // }
    // console.log(session)

    // const cookies = req.cookies
    // console.log(cookies)

    try {
        const rounds = await prisma.round.findMany({
            include: {
                users: true
            }
        });

        if (!rounds || rounds.length < 1) {
            return errorHandler("No rounds found", 404)
        }
        return sucessHandler("Active rounds", 200, rounds)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}