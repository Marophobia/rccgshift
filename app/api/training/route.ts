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
    "08034305320", //Prof Mokuolu
    "08164332812", //AY
    "+447852142970", //Ms Wendy
    "08169260066", //Pst Abiodun (France)
    "08054988179", //Pst Abiodun (France)
    "09046357054", //Pst Titi
    "08037041752", //Pst Titi
    "09164164268", //Director of Contestants
    "08162194312", //Region 50 Coordinator
    "07031342484"

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

        // Extracted valid meeting dates for 2025
        const validMeetingDates = [
            "2025-03-31", "2025-04-07", "2025-04-14", "2025-04-21", "2025-05-05",
            "2025-05-12", "2025-05-19", "2025-06-02", "2025-06-09", "2025-06-16",
            "2025-06-23", "2025-07-07", "2025-07-14", "2025-07-21", "2025-08-04",
            "2025-09-01", "2025-09-08", "2025-09-15"
        ];

        // Get the current date and time in GMT+1
        const now = new Date();
        const gmtPlusOneTime = new Date(now.getTime() + 60 * 60 * 1000);
        const currentDate = gmtPlusOneTime.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const currentHour = gmtPlusOneTime.getUTCHours(); // Get UTC hours adjusted for GMT+1

        // Check if today is a valid meeting date
        if (!validMeetingDates.includes(currentDate)) {
            return errorHandler('Access denied: Today is not a Training Date.', 403);
        }

        // Check if the current time is between 8 PM - 10 PM (GMT+1)
        if (currentHour < 19 || (currentHour === 19 && now.getMinutes() < 30) || currentHour >= 22) {
            return errorHandler("Access is only allowed between 7:30 PM - 10 PM (GMT +1).", 403);
        }

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
            const zoomLink = 'https://us06web.zoom.us/j/81763732477?pwd=l6iQmv94nInODvvabhsgQKE0lCvQdr.1';
            return sucessHandler('Account verified successfully.', 200, zoomLink);
        }

        //fetch all contestant for the current season
        const settings = await prisma.settings.findFirst();

        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }

        const contestants = await prisma.user.findMany({
            where: {
                seasonId: settings.current_season,
                paid: 1,
            },
            orderBy: {
                id: "asc",
            },
            include: {
                Season: true,
                Group: true,
            },
        });

        const groupMembers = await prisma.groupMembers.findMany({
            where: {
                seasonId: settings.current_season,
            },
            orderBy: {
                id: "asc",
            },
        });

        const contestantPhoneNumbers = contestants.flatMap((contestant) => [
            contestant.telephone,
        ]).filter((num): num is string => num !== null);

        const groupContestantPhoneNumbers = groupMembers.flatMap((contestant) => [
            contestant.telephone,
        ]).filter((num): num is string => num !== null);

        const normalizedContestantNumbers = contestantPhoneNumbers.map((num) => normalizePhoneNumber(num));
        const normalizedGroupContestantNumbers = groupContestantPhoneNumbers.map((num) => normalizePhoneNumber(num));

        // Combine all normalized numbers
        const allNormalizedNumbers = [
            ...normalizedContestantNumbers,
            ...normalizedGroupContestantNumbers,
        ];

        // Check if the provided normalizedPhoneNumber exists in the normalized numbers
        if (!allNormalizedNumbers.includes(normalizedPhoneNumber)) {
            return errorHandler(
                'You are not authorized to access this training.',
                409
            );
        }

        const zoomLink = 'https://us06web.zoom.us/j/81763732477?pwd=l6iQmv94nInODvvabhsgQKE0lCvQdr.1';

        return sucessHandler('Account verified successfully.', 200, zoomLink);
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};

