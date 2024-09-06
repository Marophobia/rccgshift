import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import { NextApiRequest } from 'next';

export const POST = async (req: NextApiRequest) => {
    try {
        await prisma.settings.update({
            where: { id: 1 },
            data: {
                status: false,
            },
        });
        return sucessHandler('Voting suspended', 201);
    } catch (error) {
        return errorHandler(`Something went wrong with the server ${error}`);
    }
};
