import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const {
        region,
        province,
        name,
        phone,
        shiftCoordinator,
        shiftCoordinatorPhone,
    } = data;

    // Validate required fields
    if (!region || !name || !phone || !shiftCoordinator || !shiftCoordinatorPhone) {
        return errorHandler('Please fill in all required fields', 400);
    }

    try {
        // Check if a regional pastor already exists for the given region and province (if applicable)
        const provincialPastorExists = await prisma.provincialPastor.findFirst({
            where: {
                region,
                ...(province && { province }), 
            },
        });

        if (provincialPastorExists) {
            return errorHandler(
                'Provincial Pastor / Coordinator already exists for this region',
                409
            );
        }

        // Create the new regional pastor record
        await prisma.provincialPastor.create({
            data: {
                region,
                province,
                name,
                phone,
                provincial_shift_coordinator_name: shiftCoordinator,
                provincial_shift_coordinator_phone: shiftCoordinatorPhone,
            },
        });

        return sucessHandler(
            'Details added successfully',
            201,
        );
    } catch (error) {
        console.error('Error adding regional pastor:', error);  // Log the error for better debugging
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
