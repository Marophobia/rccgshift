import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { writeFileSync } from 'fs';
import path from 'path';
import { generateEmailBody } from '@/lib/utils';
import { sendEmail } from '@/lib/utils';
import nodemailer from 'nodemailer';

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();
        const jData = formData.get('input');
        const data = JSON.parse(jData as string);

        // Validate required fields
        const { name, email, phoneNumber, gender, country, state, region, province, type, amount, amount_paid, position, department } = data;

        if (!name || !email || !phoneNumber || !gender || !country || !state || !region || !province || !type || !amount || !amount_paid) {
            return errorHandler('All fields are required.', 400);
        }

        if (type === 'Shift Executive') {
            if (!position || !department) {
                return errorHandler('All fields are required.', 400);
            }
        }

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
        const buffer = new Uint8Array(await file.arrayBuffer()); // Convert to Uint8Array
        writeFileSync(savePath, buffer); // Write file using Uint8Array


        //check for unique email
        const existingOfficial = await prisma.officials.findUnique({
            where: { email }
        });

        if (existingOfficial) {
            return errorHandler('Email already exists.', 409);
        }

        //validate amount
        if (Number(amount) < 100000) {
            return errorHandler('Amount must be at least ₦100,000.', 409);
        }

        //validate amount paid
        if (Number(amount_paid) < Number(amount) * 0.5) {
            return errorHandler('Amount paid must be at least 50% of the total amount.', 409);
        }

        // Retrieve competition settings
        const settings = await prisma.settings.findFirst();
        if (!settings?.current_season) {
            return errorHandler('Settings or current season not found.', 404);
        }

        // Use a transaction to create official and official session
        const official = await prisma.$transaction(async (tx) => {
            const newOfficial = await tx.officials.create({
                data: {
                    name,
                    email,
                    phone: phoneNumber,
                    country,
                    state,
                    image: uniqueFileName,
                    type,
                    createdAt: new Date(),
                },
            });

            const officialSession = await tx.official_Session.create({
                data: {
                    amount_to_pay: Number(amount),
                    position,
                    departmentId: Number(department),
                    region,
                    province,
                    officialId: newOfficial.id,
                    seasonId: settings.current_season,
                },
            });

            return { newOfficial, officialSession };
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
            <p> You have successfully initialized your registration as an Executive / Coordinator for RCCG International Shift talent Hunt Season 3. 
                Thank you. <br> Please find the details of your registration below <br><br>
                <li>Name: ${official.newOfficial.name}</li>
                <li>Email Address: ${official.newOfficial.email}</li>
                <li>Phone: ${official.newOfficial.phone}</li>
                <li>Region: ${official.officialSession.region}</li>
                <li>Province: ${official.officialSession.province}</li> <br>

                Please click on the following link to continue your registration and pay the required
                amount you want to contribute to the competition. <br><br>

                    <a href="https://rccgshift.org/register/coordinator/${official.newOfficial.id}" 
                    style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                    color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                    border-radius: 5px;"> Continue Registration </a> <br><br>
            </p>`;
        // reg started continue here...

        const body = await generateEmailBody(name, message);
        await sendEmail(email, 'Registration Initialized!', body, transporter);

        return sucessHandler('Coordinator/Executive registered successfully', 201, { season: settings.current_season, id: official.officialSession.id });

    } catch (error: any) {
        console.error('Error registering coordinator/executive:', error);
        return errorHandler(`Something went wrong: ${error.message}`, 500);
    }
};
