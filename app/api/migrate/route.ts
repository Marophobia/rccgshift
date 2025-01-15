import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    try {

        const users = await prisma.user.findMany();
        for (const user of users) {
            await prisma.user.update({
                where: { id: user.id },
                data: { tag: user.id },
            });
        }
        console.log('Tags successfully migrated.');
        // Return success response with the assigned tag
        return sucessHandler('Tags successfully migrated.', 201);
    } catch (error) {
        console.error('Error adding new user:', error);
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
