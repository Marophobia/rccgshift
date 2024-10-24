import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const {
        region,
        province,
        state,
        name,
        phone,
        shiftCoordinator,
        shiftCoordinatorPhone,
        assistantShiftCoordinator,
        assistantShiftCoordinatorPhone,
    } = data;

    // Validate required fields
    if (!region || !state || !name || !phone) {
        return errorHandler('Please fill in all required fields', 400);
    }

    try {
        // Check if a regional pastor already exists for the given region and province (if applicable)
        const regionalPastorExists = await prisma.regionalPastor.findFirst({
            where: {
                region,
                ...(province && { province }),  // Include province conditionally
            },
        });

        if (regionalPastorExists) {
            return errorHandler(
                'Regional Pastor already exists for this region',
                409
            );
        }

        // Create the new regional pastor record
        await prisma.regionalPastor.create({
            data: {
                region,
                province,
                state,
                name,
                phone,
                regional_shift_coordinator_name: shiftCoordinator,
                regional_shift_coordinator_phone: shiftCoordinatorPhone,
                assistant_regional_shift_coordinator_name:
                    assistantShiftCoordinator,
                assistant_regional_shift_coordinator_phone:
                    assistantShiftCoordinatorPhone,
            },
        });

        return sucessHandler(
            'Regional Pastor added successfully',
            201,
        );
    } catch (error) {
        console.error('Error adding regional pastor:', error);  // Log the error for better debugging
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
