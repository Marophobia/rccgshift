import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const data = await req.json();
    const {
        region,
        state,
        name,
        phone,
        shiftCoordinator,
        shiftCoordinatorPhone,
        assistantShiftCoordinator,
        assistantShiftCoordinatorPhone,
    } = data;

    if (!region || !state || !name || !phone) {
        return errorHandler('Please fill in all required fields', 400);
    }

    try {
        const regionalPastorExists = await prisma.regionalPastor.findFirst({
            where: {
                region,
                // state,
            },
        });

        if (regionalPastorExists) {
            return errorHandler(
                'Regional Pastor already exists for this region',
                409
            );
        }

        const regionalPastor = await prisma.regionalPastor.create({
            data: {
                region,
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
            regionalPastor
        );
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`);
    }
};
