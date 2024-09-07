import prisma from "@/lib/db";
import { errorHandler, sucessHandler } from "@/lib/functions";

export const POST = async (req: Request) => {
    const { data } = await req.json();
    const { id, vote } = data

    if (!id || !vote) {
        return errorHandler('Missing Vote', 400);
    }

    try {
        const current_round = await prisma.settings.findFirst({
            include: {
                round: true
            }
        });
        if (current_round?.round.status) {

            const user = await prisma.user.findFirst({
                where: {
                    id: id
                },
                include: {
                    user_sessions: true
                }
            })

            const userCurrentSession = user?.user_sessions.find(round => round.round_id === current_round.current_round)

            await prisma.user_session.update({
                where: {
                    id: userCurrentSession?.id
                },
                data: {
                    votes: {
                        increment: vote
                    }
                }
            }).catch((e) => {
                console.log(`Unable to update vote: ${e}`)
                return errorHandler(`Unable to update vote: ${e}`);
            });
        }

        return sucessHandler("Vote Successful", 201);

    } catch (error) {
        return errorHandler(`Something went wrong with the server ${error}`);
    }
};
