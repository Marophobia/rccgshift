import prisma from '@/lib/db';

export const skip = async (isSkipped: boolean) => {
    console.log('Skipping action...');
    await prisma.settings.update({
        where: { id: 1 },
        data: { status: isSkipped },
    });
};
