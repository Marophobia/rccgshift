import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { errorHandler, sucessHandler } from "@/lib/functions";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and has the correct role
    if (!session || session.user.role !== 'judge') {
        return errorHandler("Unauthenticated", 401);  // 401 for unauthorized
    }

    // Extract id and vote from the request body
    const { id, vote } = await req.json();

    // Validate input
    if (!id || vote === undefined) {
        return errorHandler('Missing Vote', 400);  // Use 400 for bad request
    }

    try {
        // Check the current status of the contestant
        const contestant = await prisma.user_session.findUnique({
            where: { id: id },
            select: { status: true } // Only select the status field
        });

        if (!contestant) {
            return errorHandler('Contestant not found', 404);
        }

        // If the contestant's status is already "voted", do not update
        if (contestant.status === 'voted') {
            return errorHandler('Vote already registered', 400);
        }

        // If the vote is valid and contestant hasn't been voted for, proceed with update
        if (vote > 0) {
            await prisma.user_session.update({
                where: { id: id },  // Ensure `id` is unique in the schema
                data: {
                    judge_votes: {
                        increment: vote,
                    },
                    status: 'voted'  // Update status to 'voted'
                },
            });

            return sucessHandler('Vote Registered', 200);
        }

        // Handle the case where vote === 0
        if (vote === 0) {
            // Update the status to 'voted' even though no judge votes were added
            await prisma.user_session.update({
                where: { id: id },
                data: {
                    status: 'voted'  // Update status to 'voted'
                },
            });

            return sucessHandler('Vote Registered', 200);
        }

    } catch (error) {
        return errorHandler(`Something went wrong with the server: ${error}`, 500);
    }
};
