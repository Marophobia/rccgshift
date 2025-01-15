import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { UserStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export const POST = async (req: Request) => {
    try {

        // Parse and destructure the request body
        // get formData input
        const formData = await req.formData();
        const jData = formData.get("input");
        console.log("FOrm data is:", jData)

        if (!jData || typeof jData !== "string") {
            return new Response(
                JSON.stringify({ error: "Invalid input data" }),
                { status: 400 }
            );
        }

        const data = JSON.parse(jData);

        const {
            name,
            email,
            phoneNumber,
            gender,
            ageGrade,
            country,
            state,
            region,
            province,
            category,
            participation,
            groupName,
            groupsize,
        } = data;

        // Validate required fields
        if (
            !name ||
            !email ||
            !phoneNumber ||
            !gender ||
            !ageGrade ||
            !country ||
            !state ||
            !region ||
            !province ||
            !category ||
            !participation
        ) {
            return errorHandler('Please fill in all required fields.', 400);
        }

        // Additional validation for group participation
        if (participation === 'Group' && (!groupName || !groupsize)) {
            return errorHandler('Group name and size are required for group participation.', 400);
        }

        // Retrieve competition settings
        const settings = await prisma.settings.findFirst();
        if (!settings || !settings.current_season) {
            return errorHandler('Settings or current season not found.', 404);
        }

        // Check if the user is already registered for this season
        const contestantExists = await prisma.user.findFirst({
            where: { email, seasonId: settings.current_season },
        });

        if (contestantExists) {
            return errorHandler(
                'This email is already registered for the competition.',
                409
            );
        }

        // get formData image
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            return errorHandler('No Image Selected or Invalid File', 409);
        }

        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxImageSize = 3 * 1024 * 1024; // 3MB

        // Check if the image is a valid type and size
        if (!validImageTypes.includes(file.type)) {
            return errorHandler(
                'Invalid Image Type',
                409
            );
        }

        if (file.size > maxImageSize) {
            return errorHandler(
                'File must not be more than 3MB',
                409
            );
        }

        const generateRandomString = (length: number): string => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        const randomPrefix = generateRandomString(8);
        const uniqueFileName = randomPrefix + '_' + file.name;
        const savePath = path.join('/var/www/images.rccgshift.org', uniqueFileName);

        // Read the file as a buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Save the file to the server
        fs.writeFileSync(savePath, buffer);

        // Return the public URL
        const publicUrl = `https://images.rccgshift.org/${uniqueFileName}`;

        // Fetch the highest existing tag for the current season
        const highestTag = await prisma.user.findFirst({
            where: { seasonId: settings.current_season },
            orderBy: { tag: 'desc' },
            select: { tag: true },
        });

        const nextTag = (highestTag?.tag || 0) + 1; // Increment tag by 1

        // Handle group creation if applicable
        let groupId = null;
        if (participation === 'Group') {
            const group = await prisma.group.create({
                data: {
                    name: groupName,
                    size: Number(groupsize),
                },
            });
            groupId = group.id; // Assign the created group's ID
        }

        // Create the user record with the generated tag
        const newUser = await prisma.user.create({
            data: {
                picture: uniqueFileName,
                name,
                email,
                telephone: phoneNumber,
                gender,
                age_grade: ageGrade,
                country,
                state,
                region,
                province,
                category,
                type: participation,
                paid: 0,
                status: UserStatus.registered,
                seasonId: settings.current_season,
                tag: nextTag, // Assign the dynamic tag
                ...(groupId !== null && { groupId }),
            },
        });

        let firstRound;

        // Fetch the first round for the current season where the id is the lowest
        firstRound = await prisma.round.findFirst({
            where: {
                seasonId: settings.current_season,
            },
            orderBy: {
                id: 'asc',
            },
        });

        if (!firstRound) {
            firstRound = await prisma.round.create({
                data: {
                    name: 'Audition 1',
                    seasonId: settings.current_season
                }
            })
        }

        //create user session
        await prisma.user_session.create({
            data: {
                season_id: settings.current_season,
                round_id: firstRound?.id,
                user_id: newUser.id,
                position: null,

            }
        })

        // Return success response with the assigned tag
        return sucessHandler('Details added successfully.', 201, { tag: newUser.tag, season: settings.current_season });
    } catch (error) {
        console.error('Error adding new user:', error);
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
