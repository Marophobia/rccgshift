import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    try {
        const data = await req.json();
        const {
            id,
            region,
            state,
            name,
            phone,
            shiftCoordinator,
            shiftCoordinatorPhone,
        } = data;

        if (!id) {
            return errorHandler("Missing 'id' parameter", 400);
        }

        const editEntry = await prisma.provincialPastor.update({
            where: { id },
            data: {
                region,
                name,
                phone,
                provincial_shift_coordinator_name: shiftCoordinator,
                provincial_shift_coordinator_phone: shiftCoordinatorPhone,
            },
        });

        if (editEntry) {
            return sucessHandler('Updated', 200);
        }
    } catch (error) {
        console.error('Error processing the request:', error);
        return errorHandler(`Something went wrong: ${error}`);
    }
};
