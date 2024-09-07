import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    const { isSkipped } = await req.json();

    try {
        const updatedSettings = await prisma.settings.update({
            where: { id: 1 },
            data: { status: isSkipped },
        });
        return sucessHandler('Setting changed', 201, updatedSettings);
    } catch (error) {
        return errorHandler('Failed to update settings', 500);
    }
};
