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
    "08112949474", // Pst Maro
    "09060008891",
    "08033432033",
    "07035901959",
    "07034979194",
    "08166768999", //Korede
    "08134954090", //Tom
    "09011550670", //Kinrin
    "09136547692", //Jotham
    "254702675652",
    "254729870864",
    "254717546393",
    "447792059903",
    "233548314145",
    "447448735749",
    "254725400813",
    "07033037599",
    "08055192244",
    "08065558565",
    "08063483767"
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
            GH: '233', //Ghana
            KEN: '254', //Kenya
            UK: '44',  // United Kingdom
            FR: '33',  // France
            CA: '1',   // Canada

        };

        const normalizePhoneNumber = (number: string | null): string => {
            if (!number) return ''; // Return an empty string for null or undefined values

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
            const zoomLink = 'https://us06web.zoom.us/j/86750499214?pwd=4yI2BQUiJVMcw1ai1fe3gbsFzdky6H.1';
            return sucessHandler('Account verified successfully.', 200, zoomLink);
        }

        // Fetch all regionalPastor records
        const regionalPastors = await prisma.regionalPastor.findMany({
            select: {
                regional_shift_coordinator_phone: true,
                phone: true,
                assistant_regional_shift_coordinator_phone: true,
            },
        });

        // Fetch all provincialPastor records
        const provincialPastors = await prisma.provincialPastor.findMany({
            select: {
                provincial_shift_coordinator_phone: true,
                phone: true,
            },
        });

        // Extract and normalize phone numbers from regionalPastor
        const regionalNumbers = regionalPastors.flatMap((pastor) => [
            pastor.regional_shift_coordinator_phone,
            pastor.phone,
            pastor.assistant_regional_shift_coordinator_phone,
        ]).filter((num): num is string => num !== null); // Remove null values

        const normalizedRegionalNumbers = regionalNumbers.map((num) => normalizePhoneNumber(num));

        // Extract and normalize phone numbers from provincialPastor
        const provincialNumbers = provincialPastors.flatMap((pastor) => [
            pastor.provincial_shift_coordinator_phone,
            pastor.phone,
        ]).filter((num): num is string => num !== null); // Remove null values

        const normalizedProvincialNumbers = provincialNumbers.map((num) => normalizePhoneNumber(num));

        // Combine all normalized numbers
        const allNormalizedNumbers = [
            ...normalizedRegionalNumbers,
            ...normalizedProvincialNumbers,
        ];

        // Check if the provided normalizedPhoneNumber exists in the normalized numbers
        if (!allNormalizedNumbers.includes(normalizedPhoneNumber)) {
            return errorHandler(
                'You are not authorized to access this training.',
                409
            );
        }

        const zoomLink = 'https://us06web.zoom.us/j/86750499214?pwd=4yI2BQUiJVMcw1ai1fe3gbsFzdky6H.1';

        return sucessHandler('Account verified successfully.', 200, zoomLink);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};

