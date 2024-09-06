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
    const { id } = await req.json();

    // Validate input
    if (!id) {
        return errorHandler('Missing Contestant', 400);
    }

    try {


        // Check if skipping is allowed
        const settings = await prisma.settings.findFirst({});
        if (!settings) {
            return errorHandler('Settings Not Found', 404);
        }

        if (!settings.status) {
            return errorHandler('You are not allowed to skip', 405);
        }

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

        if (contestant.status === 'pending') {
            await prisma.user_session.update({
                where: { id: id },  // Ensure `id` is unique in the schema
                data: {
                    status: 'skipped'  // Update status to 'skipped'
                },
            });
        }


        return sucessHandler('Vote Skipped', 200);
    } catch (error) {
        return errorHandler(`Something went wrong with the server: ${error}`, 500);
    }
};