import prisma from "@/lib/db";
import { errorHandler, sucessHandler } from "@/lib/functions";

const PAYSTACK_SECRET_KEY = 'sk_test_59ab9cc716783cee32bd8ac11973d553a70f6155'; // Your secret key

export const POST = async (req: Request) => {
    const { data, reference } = await req.json();
    const { id, vote } = data;

    if (!id || !vote || !reference) {
        return errorHandler('Missing Vote or Reference', 400);
    }

    // Verify transaction with Paystack
    try {
        const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.status || verifyData.data.status !== 'success') {
            return errorHandler('Transaction verification failed', 400);
        }

        // Proceed to update the database
        const current_round = await prisma.settings.findFirst({
            include: {
                round: true,
            },
        });

        if (current_round?.round.status) {
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user_sessions: true,
                },
            });

            const userCurrentSession = user?.user_sessions.find(
                (round) => round.round_id === current_round.current_round
            );

            await prisma.user_session.update({
                where: {
                    id: userCurrentSession?.id,
                },
                data: {
                    votes: {
                        increment: vote,
                    },
                },
            }).catch((e) => {
                console.log(`Unable to update vote: ${e}`);
                return errorHandler(`Unable to update vote: ${e}`);
            });
        }

        return sucessHandler("Vote Successful", 201);
    } catch (error) {
        return errorHandler(`Something went wrong with the server: ${error}`);
    }
};
