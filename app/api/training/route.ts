import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

const phoneNumbers: string[] = [
    "07060626135", // Pst Steve
    "08058834954", // Pst James
    "08104238564", // Sis Abigail
    "09093478754", // Pst Bakare
    "08052131325", // Pst Collins
    "08060248251", // Pst Abiodun
    "08025569805", // Pst Yemi Adetonwa
    "08037660606", // Barr Sam Sadiq
    "07039463965", // Pst Jonah Paul
    "08060707076", // Pst Seye
    "07035901959", // Engr. Dammy
    "08137894972", // Sis Idy F A
    "09130714674", // Sis Sandra
    "08080113865", // Pst Shola
    "08033675762", // Pst Ilesanmi
    "08035452373", // Pst Java
    "08058834954", // Pst James (IT & Web)
    "08060248251", // Pst Abiodun (Program)
    "08038824894", // Pst Obunge (1st number)
    "08142131191", // Pst Obunge (2nd number)
    "08023682430", // Pst Noah
    "08034700834", // Pst Shola
    "08064989474", // Pst Lekan
    "08169260066", // Pst Abiodun D
    "08056302618", // Pst Sesan
    "07034666656", // Pst Daniel
];


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

        const normalizePhoneNumber = (number: string) => {
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

        // Check if the phone number exists in the predefined list
        if (phoneNumbers.includes(normalizedPhoneNumber)) {
            const zoomLink = 'https://us06web.zoom.us/j/85857710606';
            return sucessHandler('Account verified successfully.', 200, zoomLink);
        }

        // Check if the phone number exists in regionalPastor table
        const numberExists = await prisma.regionalPastor.findFirst({
            where: {
                OR: [
                    { regional_shift_coordinator_phone: normalizedPhoneNumber },
                    { phone: normalizedPhoneNumber },
                    { assistant_regional_shift_coordinator_phone: normalizedPhoneNumber },
                ],
            },
        });

        // Check if the phone number exists in provincialPastor table
        const numberExists2 = await prisma.provincialPastor.findFirst({
            where: { provincial_shift_coordinator_phone: normalizedPhoneNumber, phone: normalizedPhoneNumber },
        });

        if (!numberExists && !numberExists2) {
            return errorHandler(
                'You are not authorized to access this training.',
                409
            );
        }

        const zoomLink = 'https://us06web.zoom.us/j/85857710606';

        return sucessHandler('Account verified successfully.', 200, zoomLink);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};

