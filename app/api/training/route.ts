import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';

// Predefined list of authorized phone numbers (admins, key personnel)
const adminPhoneNumbers: string[] = [
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

// --- Phone Number Normalization Function ---
const countryCodeMapping = {
    NG: '234', // Nigeria
    GH: '233', // Ghana
    KEN: '254', // Kenya
    UK: '44',  // United Kingdom
    FR: '33',  // France
    CA: '1',   // Canada
};

const normalizePhoneNumber = (number: string | null | undefined): string => {
    if (!number) return ''; // Return an empty string for null, undefined or empty values

    // Remove non-digits and "+" prefix if present
    let sanitized = number.replace(/\D/g, '');

    // Check if the number starts with a known international code
    for (const [country, code] of Object.entries(countryCodeMapping)) {
        if (sanitized.startsWith(code)) {
            // Specific normalization for Nigeria (prefix with 0)
            if (country === 'NG' && sanitized.startsWith('234')) {
                // Ensure it's not just '234'
                if (sanitized.length > 3) {
                    return '0' + sanitized.slice(3);
                } else {
                    return ''; // Invalid Nigerian number format
                }
            }
            // For other known international codes, return the sanitized version (keeping the code)
            // Or decide if you want to strip them too based on requirements.
            // Keeping them for now:
            return sanitized;
        }
    }

    // Handle Nigerian numbers potentially starting with '0'
    if (sanitized.startsWith('0') && sanitized.length > 1) {
        return sanitized; // Keep as is (e.g., "080...")
    }

    // If it's a Nigerian number *without* the leading 0 (e.g., "80...")
    // and has the typical length, prepend '0'. Adjust length check as needed.
    if (!sanitized.startsWith('0') && (sanitized.length === 10)) { // Common length for Nigerian mobile numbers without 0
        return '0' + sanitized;
    }


    // Default: return the sanitized number if none of the above conditions match
    // This might include numbers from countries not in mapping or malformed numbers.
    return sanitized;
};
// --- End Normalization Function ---

export const POST = async (req: Request) => {
    const { phoneNumber } = await req.json();

    try {
        // 1. Validate request data
        if (!phoneNumber) {
            return errorHandler('Phone Number is Required.', 400);
        }

        // 2. Time and Date Check (Existing Logic)
        const validMeetingDates = [
            "2025-03-31", "2025-04-07", "2025-04-14", "2025-04-21", "2025-05-05",
            "2025-05-12", "2025-05-19", "2025-05-20", "2025-06-02", "2025-06-09", "2025-06-16",
            "2025-06-23", "2025-07-07", "2025-07-14", "2025-07-21", "2025-08-04",
            "2025-09-01", "2025-09-08", "2025-09-15"
        ];
        const now = new Date();
        const gmtPlusOneTime = new Date(now.getTime() + 60 * 60 * 1000);
        const currentDate = gmtPlusOneTime.toISOString().split('T')[0];
        const currentHour = gmtPlusOneTime.getUTCHours();

        if (!validMeetingDates.includes(currentDate)) {
            return errorHandler('Access denied: Today is not a Training Date.', 403);
        }
        if (currentHour < 19 || (currentHour === 19 && now.getMinutes() < 30) || currentHour >= 22) {
            return errorHandler("Access is only allowed between 7:30 PM - 10 PM (GMT +1).", 403);
        }

        // 3. Normalize the input phone number
        const normalizedInputPhoneNumber = normalizePhoneNumber(phoneNumber);
        if (!normalizedInputPhoneNumber) {
            return errorHandler('Invalid Phone Number format provided.', 400);
        }


        // 4. Normalize the admin phone list for consistent comparison
        const normalizedAdminNumbers = adminPhoneNumbers.map(normalizePhoneNumber).filter(Boolean); // Filter out empty strings from normalization

        // 5. Check against Admin List
        if (normalizedAdminNumbers.includes(normalizedInputPhoneNumber)) {
            const zoomLink = 'https://us06web.zoom.us/j/81763732477?pwd=l6iQmv94nInODvvabhsgQKE0lCvQdr.1';
            console.log(`Access granted (Admin): ${phoneNumber} -> ${normalizedInputPhoneNumber}`);
            return sucessHandler('Account verified successfully (Admin).', 200, zoomLink);
        }

        // 6. Fetch Current Season Settings
        const settings = await prisma.settings.findFirst();
        if (!settings || !settings.current_season) {
            return errorHandler("Settings or current season not found", 404);
        }
        const currentSeasonId = settings.current_season;

        // 7. Fetch Paid Contestants for the Current Season
        const contestants = await prisma.user.findMany({
            where: {
                seasonId: currentSeasonId,
                paid: 1, // Only paid contestants
                telephone: { not: null } // Ensure telephone exists
            },
            select: { // Select only necessary fields
                telephone: true,
                region: true,
                province: true
            }
        });

        // 8. Fetch Group Members for the Current Season
        const groupMembers = await prisma.groupMembers.findMany({
            where: {
                seasonId: currentSeasonId,
                telephone: { not: null } // Ensure telephone exists
            },
            select: { // Select only necessary fields
                telephone: true
            }
        });

        // 9. Extract and Normalize Contestant & Group Member Phone Numbers
        const contestantPhoneNumbers = contestants
            .map(c => normalizePhoneNumber(c.telephone))
            .filter(Boolean); // Remove empty strings after normalization

        const groupMemberPhoneNumbers = groupMembers
            .map(gm => normalizePhoneNumber(gm.telephone))
            .filter(Boolean); // Remove empty strings

        const allContestantAndGroupNumbers = new Set([
            ...contestantPhoneNumbers,
            ...groupMemberPhoneNumbers
        ]);

        // 10. Check against Contestant & Group Member List
        if (allContestantAndGroupNumbers.has(normalizedInputPhoneNumber)) {
            const zoomLink = 'https://us06web.zoom.us/j/81763732477?pwd=l6iQmv94nInODvvabhsgQKE0lCvQdr.1';
            console.log(`Access granted (Contestant/Group Member): ${phoneNumber} -> ${normalizedInputPhoneNumber}`);
            return sucessHandler('Account verified successfully (Contestant).', 200, zoomLink);
        }

        // --- New Logic: Fetch and Check Coordinators ---

        // 11. Extract Unique Regions and Provinces from Contestants
        const uniqueRegions = new Set<string>();
        const uniqueProvinces = new Set<string>();

        contestants.forEach(contestant => {
            // Add only if region/province is a non-empty string
            if (contestant.region && typeof contestant.region === 'string' && contestant.region.trim()) {
                uniqueRegions.add(contestant.region.trim());
            }
            if (contestant.province && typeof contestant.province === 'string' && contestant.province.trim()) {
                uniqueProvinces.add(contestant.province.trim());
            }
        });

        const regionsArray = Array.from(uniqueRegions);
        const provincesArray = Array.from(uniqueProvinces);

        console.log("Unique Regions from Contestants:", regionsArray);
        console.log("Unique Provinces from Contestants:", provincesArray);


        let coordinatorPhoneNumbers: string[] = [];

        // 12. Fetch Regional Coordinators if regions were found
        if (regionsArray.length > 0) {
            const regionalCoordinators = await prisma.regionalPastor.findMany({
                where: {
                    region: {
                        in: regionsArray,
                    },
                },
                select: { // Select only phone numbers
                    phone: true,
                    regional_shift_coordinator_phone: true,
                    assistant_regional_shift_coordinator_phone: true,
                }
            });

            // Extract phone numbers from regional coordinators
            regionalCoordinators.forEach(pastor => {
                if (pastor.phone) coordinatorPhoneNumbers.push(pastor.phone);
                if (pastor.regional_shift_coordinator_phone) coordinatorPhoneNumbers.push(pastor.regional_shift_coordinator_phone);
                // Ensure assistant phone exists before adding
                if (pastor.assistant_regional_shift_coordinator_phone) coordinatorPhoneNumbers.push(pastor.assistant_regional_shift_coordinator_phone);
            });
            console.log(`Fetched ${regionalCoordinators.length} regional coordinator records.`);
        }

        // 13. Fetch Provincial Coordinators if provinces were found
        if (provincesArray.length > 0) {
            const provincialCoordinators = await prisma.provincialPastor.findMany({
                where: {
                    province: {
                        in: provincesArray,
                    },
                },
                select: { // Select only phone numbers
                    phone: true,
                    provincial_shift_coordinator_phone: true,
                }
            });

            // Extract phone numbers from provincial coordinators
            provincialCoordinators.forEach(pastor => {
                if (pastor.phone) coordinatorPhoneNumbers.push(pastor.phone);
                if (pastor.provincial_shift_coordinator_phone) coordinatorPhoneNumbers.push(pastor.provincial_shift_coordinator_phone);
            });
            console.log(`Fetched ${provincialCoordinators.length} provincial coordinator records.`);
        }

        // 14. Normalize Coordinator Phone Numbers
        const normalizedCoordinatorNumbers = coordinatorPhoneNumbers
            .map(normalizePhoneNumber)
            .filter(Boolean); // Remove empty strings resulting from normalization

        const uniqueNormalizedCoordinatorNumbers = new Set(normalizedCoordinatorNumbers);
        console.log("Normalized Coordinator Numbers:", Array.from(uniqueNormalizedCoordinatorNumbers));


        // 15. Check against Coordinator List
        if (uniqueNormalizedCoordinatorNumbers.has(normalizedInputPhoneNumber)) {
            const zoomLink = 'https://us06web.zoom.us/j/81763732477?pwd=l6iQmv94nInODvvabhsgQKE0lCvQdr.1';
            console.log(`Access granted (Coordinator): ${phoneNumber} -> ${normalizedInputPhoneNumber}`);
            return sucessHandler('Account verified successfully (Coordinator).', 200, zoomLink);
        }

        // --- End New Logic ---

        // 16. If not found in any list, deny access
        console.log(`Access denied: ${phoneNumber} -> ${normalizedInputPhoneNumber} not found in any authorized list.`);
        return errorHandler(
            'You are not authorized to access this training.',
            403 // Using 403 Forbidden is more appropriate here
        );

    } catch (error) {
        console.error("Error during authentication:", error); // Log the actual error
        // Avoid exposing internal error details to the client in production
        const errorMessage = error instanceof Error ? error.message : String(error);
        return errorHandler(`An internal error occurred. Please try again later.`, 500);
        // Or for debugging: return errorHandler(`Something went wrong: ${errorMessage}`, 500);
    }
};