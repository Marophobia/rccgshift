import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

export const POST = async (req: Request) => {
    const { phoneNumber } = await req.json();

    try {
        // Validate request data
        if (!phoneNumber) {
            return errorHandler('Phone Number is Required.', 400);
        }

        const countryCodeMapping = {
            NG: '234', // Nigeria
            UK: '44',  // United Kingdom
            FR: '33',  // France
            CA: '1',   // Canada
        };

        const normalizePhoneNumber = (number: any) => {
            // Remove non-digits and "+" prefix
            let sanitized = number.replace(/\D/g, '');

            // Check if the number starts with a known country code
            for (const [country, code] of Object.entries(countryCodeMapping)) {
                if (sanitized.startsWith(code)) {
                    // Normalize to local format (e.g., "08112949474" for Nigeria)
                    if (country === 'NG' && sanitized.startsWith('234')) {
                        return '0' + sanitized.slice(3);
                    }
                    return sanitized; // Keep as is for other countries
                }
            }

            // Assume it's already in local format if no country code is found
            return sanitized;
        };


        const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

        // Check if the phone number exists in regionalPastor table
        const numberExists = await prisma.regionalPastor.findFirst({
            where: {
                OR: [
                    { regional_shift_coordinator_phone: normalizedPhoneNumber },
                    { assistant_regional_shift_coordinator_phone: normalizedPhoneNumber },
                ],
            },
        });

        // Check if the phone number exists in provincialPastor table
        const numberExists2 = await prisma.provincialPastor.findFirst({
            where: { provincial_shift_coordinator_phone: normalizedPhoneNumber },
        });

        if (!numberExists && !numberExists2) {
            return errorHandler(
                'You are not authorized to access this training.',
                409
            );
        }

        const zoomLink = 'https://zoom.com';

        return sucessHandler('Account verified successfully.', 200, zoomLink);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
