import prisma from "@/lib/db";
import { errorHandler, sucessHandler } from "@/lib/functions";
import { NextApiRequest } from "next";

export const POST = async (req: Request) => {
    const { id, vote } = await req.json();
    if (!id || !vote) {
        return errorHandler('Missing Vote', 400)
    }

    try {
        const current_round = await prisma.settings.findFirst({})
        if (current_round?.status) {
            await prisma.user_session.update({
                where: {
                    id, status: true
                },
                data: {
                    votes: {
                        increment: vote
                    }
                }
            }).catch((e) => {
                return errorHandler(`Unable to update vote: ${e}`)
            })
        }
        // are we storing the late votes to update in later rounds
        return sucessHandler("Vote Successfull", 201)
    } catch (error) {
        return errorHandler(`Something went wrong with the server ${error}`)
    }
}
