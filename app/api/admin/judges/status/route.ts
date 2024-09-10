import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    const { id, status } = await req.json();
    try {
        await prisma.admin
            .update({
                where: { id },
                data: { status },
            })
            .catch((error) => {
                console.error(error);
                return errorHandler(`Failed to update admin status: ${error}`);
            });
        return sucessHandler('Judge updated', 201);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
