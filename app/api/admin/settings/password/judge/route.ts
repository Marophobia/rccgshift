import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }

    const data = await req.json();
    const { judge, oldPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword)
        return errorHandler('Passwords do not match', 401);

    try {
        const admin = await prisma.admin.findFirst({
            where: {
                role: judge,
            },
        });

        if (!admin) {
            return errorHandler('Judge not Found', 404);
        }

        //make sure to compare hashes
        if (admin.password !== oldPassword)
            return errorHandler('incorrect old Password', 401);

        //make sure to hash password
        await prisma.admin.update({
            where: {
                id: admin.id,
            },
            data: {
                password: newPassword,
            },
        });

        return sucessHandler('Password Changed', 200);
    } catch (error) {
        console.error(error);
        return errorHandler(`Something went wrong: ${error}`);
    }
};
