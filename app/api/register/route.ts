import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { UserStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'fs';
import nodemailer from 'nodemailer';
import { generateEmailBody, sendEmail } from '@/lib/utils';

export const POST = async (req: Request) => {
    try {
        // Parse and extract form data
        const formData = await req.formData();
        const jData = formData.get('input');

        if (!jData || typeof jData !== 'string') {
            return errorHandler('Invalid input data', 400);
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
            type,
            creativity,
            heardAbout,
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
            !heardAbout
        ) {
            return errorHandler('Please fill in all required fields.', 400);
        }

        if (type === 1 && (!category || !participation)) {
            return errorHandler('Please fill in all required fields.', 400);
        }

        if (type === 2 && (groupsize < 20 || !groupName || !groupName)) {
            return errorHandler('Choir Size must be at least 20.', 400);
        }

        if (participation === 'Group' && (!groupName || !groupsize)) {
            return errorHandler(
                'Group name and size are required for group participation.',
                400
            );
        }

        // Retrieve competition settings
        const settings = await prisma.settings.findFirst();
        if (!settings?.current_season) {
            return errorHandler('Settings or current season not found.', 404);
        }

        // Check if the user is already registered for this season in either table
        // const userExists = await prisma.user.findFirst({
        //     where: { email, seasonId: settings.current_season },
        // });

        // if (userExists) {
        //     return errorHandler(
        //         'This email is already registered for the competition.',
        //         409
        //     );
        // }

        // Validate image upload
        const file = formData.get('file');
        if (!(file instanceof File)) {
            return errorHandler('No image selected or invalid file.', 409);
        }

        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validImageTypes.includes(file.type)) {
            return errorHandler('Invalid image type.', 409);
        }

        if (file.size > 5 * 1024 * 1024) {
            // 3MB limit
            return errorHandler('File must not be more than 5MB.', 409);
        }

        // Generate unique filename and save image
        const uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
        const savePath = path.join('/var/www/images.rccgshift.org', uniqueFileName);
        const buffer = new Uint8Array(await file.arrayBuffer()); 
        writeFileSync(savePath, buffer);

        // Determine next tag
        // const highestTag = await prisma.user.findFirst({
        //     where: { seasonId: settings.current_season, competitionType: type },
        //     orderBy: { tag: 'desc' },
        //     select: { tag: true },
        // });

        // const nextTag = (highestTag?.tag || 0) + 1;

        // Handle group creation if applicable
        let groupId = null;
        if (participation === 'Group' || type === 2) {
            const group = await prisma.group.create({
                data: { name: groupName, size: Number(groupsize), type },
            });
            groupId = group.id;
        }

        // Create user or choir entry
        const commonData = {
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
            paid: 0,
            status: UserStatus.registered,
            seasonId: settings.current_season,
            // tag: nextTag,
            ...(groupId && { groupId }),
            competitionType: type,
            heardAbout,
        };

        const newUser =
            type === 1
                ? await prisma.user.create({
                    data: { ...commonData, category, type: participation, creativity },
                })
                : await prisma.user.create({ data: commonData });

        // Get or create first round
        let firstRound =
            (await prisma.round.findFirst({
                where: { seasonId: settings.current_season },
                orderBy: { id: 'asc' },
            })) ??
            (await prisma.round.create({
                data: { name: 'Audition 1', seasonId: settings.current_season },
            }));

        // Create user session
        const user = await prisma.user_session.create({
            data: {
                season_id: settings.current_season,
                round_id: firstRound.id,
                user_id: newUser.id,
                position: null,
                type,
            },
        });

        // send a mail
        const transporter = nodemailer.createTransport({
            port: 465,
            host: 'mail.privateemail.com',
            auth: {
                user: 'info@rccgshift.org',
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        const message = `
            <p> You have successfully initialized your registration for RCCG International Shift talent Hunt Season 3. 
                Thank you. <br> Please find the details of your registration below <br><br>
                <li>Name: ${newUser.name}</li>
                <li>Email Address: ${newUser.email}</li>
                <li>Phone: ${newUser.telephone}</li>
                <li>Region: ${newUser.region}</li>
                <li>Province: ${newUser.province}</li> <br>

                Please click on the following link to continue your registration and pay the required
                amount for registration. <br><br>

                    <a href="https://rccgshift.org/register/${newUser.id}" 
                    style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                    color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                    border-radius: 5px;"> Continue Registration </a> <br><br>
            </p>`;
        // reg started continue here...

        const body = await generateEmailBody(name, message);
        await sendEmail(email, 'Registration Initialized!', body, transporter);

        return sucessHandler('Details added successfully.', 201, {
            tag: newUser.id,
            season: settings.current_season,
        });
    } catch (error) {
        console.error('Error adding new user:', error);
        return errorHandler('Something went wrong.', 500);
    }
};

