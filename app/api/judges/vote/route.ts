import prisma from "@/lib/db";
import { errorHandler, sucessHandler } from "@/lib/functions";
import { NextApiRequest } from "next";

const POST = async (req: Request) => {
    const { id, vote } = await req.json();
    if (!id || !vote) {
        return errorHandler('Missing Vote', 400)
    }
    try {
        if (vote > 0) {
            await prisma.user_session.update({
                where: { id, status: true },
                data: {
                    judge_votes: {
                        increment: vote,
                    },
                },
            }).catch((e) => {
                return errorHandler(`Unable to update vote: ${e}`)
            })
        }
        return sucessHandler('Vote Registered', 201)
    } catch (error) {
        return errorHandler("something went wrong with the server", 500)
    }
}

export default POST;
