import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and authorized
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 401); // Use 401 for unauthorized
    }

    try {
        const data = await req.json();
        const { id } = data;

        // Start a Prisma transaction
        const deleteEntry = await prisma.$transaction(async (prisma) => {
            return await prisma.regionalPastor.delete({
                where: { id },
            });
        });

        if (deleteEntry) {
            return sucessHandler('Deleted successfully', 200);
        } else {
            return errorHandler('Delete operation failed', 400);
        }
    } catch (error) {
        return errorHandler('Something went wrong. Please try again.', 500);
    }
};
