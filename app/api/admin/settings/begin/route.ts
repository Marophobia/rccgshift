import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Starts a new competion from round one

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        return errorHandler('Unauthenticated', 404);
    }
    try {
        // get rgisteration start date and end date
        // const somedaysAgo = new Date();
        // somedaysAgo.setDate(somedaysAgo.getDate() - 14);

        // const registeredusers = await prisma.user.findMany({
        //     where: {
        //         date: {
        //             gte: somedaysAgo,
        //         },
        //     },
        // });

        const registeredusers = await prisma.user.findMany({
            where: {
                status: 'registered',
            },
        });

        await prisma.settings.update({
            where: { id: 1 },
            data: { current_round: 1 },
        });

        await Promise.all(
            registeredusers.map(async (user) => {
                await prisma.user_session.create({
                    data: {
                        user_id: user.id,
                        round_id: 1,
                    },
                });
            })
        );

        return sucessHandler('first Round started', 200, {});
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
