import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { generateEmailBody, sendEmail } from '@/lib/utils';
import nodemailer from 'nodemailer';

export const POST = async (req: Request) => {

    const data = await req.json();
    const { id } = data;

    try {
        const contestant = await prisma.user.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                Group: {
                    include: {
                        GroupMembers: true,
                    }
                },
                user_sessions: {
                    include: {
                        round: true,
                        parameters: true,
                    },
                },
            },
        });

        if (!contestant) {
            return errorHandler('Contestant Not Found', 404);
        }

        await prisma.$transaction(async (tx) => {

            const transporter = nodemailer.createTransport({
                port: 465,
                host: "mail.privateemail.com",
                auth: {
                    user: 'info@rccgshift.org',
                    pass: process.env.PASSWORD,
                },
                secure: true,
            });

            let message = ''

            if (contestant.competitionType === 2) {
                // Scenario 1: type === 2
                message = `<p>
                        You have successfully completed your registration for RCCG International Shift Talent Hunt Season 3 - Choir Competition.
                        Thank you. <br> Please find the details of your registration below: <br><br>

                        <li>Name: ${contestant.name}</li>
                        <li>Email Address: ${contestant.email}</li>
                        <li>Phone: ${contestant.telephone}</li>
                        <li>Region: ${contestant.region}</li>
                        <li>Province: ${contestant.province}</li> <br>

                        You have chosen to participate as a choir with the name: <b>${contestant.Group?.name}</b>. Please give the following
                        link to your choir members to register. This link must not be shared with anyone else. <br><br>

                        <a href="https://rccgshift.org/register/group/${contestant.Group?.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Choir Link </a> <br><br>

                        At a later date, you'll be required to create a bank account. Click the button below to do so when the time comes,
                        but for now, congratulations and Welcome to International Shift Talent Hunt. <br><br>

                        <a href="https://rccgshift.org/register/${contestant?.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Open Bank Account </a>

                    </p>`;
            } else if (contestant.type === 'Group') {
                message = `<p>
                        You have successfully completed your registration for RCCG International Shift Talent Hunt Season 3.
                        Thank you. <br> Please find the details of your registration below: <br><br>

                        <li>Name: ${contestant.name}</li>
                        <li>Email Address: ${contestant.email}</li>
                        <li>Phone: ${contestant.telephone}</li>
                        <li>Region: ${contestant.region}</li>
                        <li>Province: ${contestant.province}</li>
                        <li>Category: ${contestant.category}</li>
                        <li>Participation: ${contestant.type}</li> <br>

                        You have chosen to participate as a group with the name: <b>${contestant.Group?.name}</b>. Please give the following
                        link to your team members to register. This link must not be shared with anyone else. <br><br>

                        <a href="https://rccgshift.org/register/group/${contestant.Group?.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Group Link </a> <br><br>

                        At a later date, you'll be required to create a bank account. Click the button below to do so when the time comes,
                        but for now, congratulations and Welcome to International Shift Talent Hunt. <br><br>

                        <a href="https://rccgshift.org/register/${contestant?.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Open Bank Account </a>
                    </p>`;
            } else if (contestant.competitionType === 1) {
                message = `<p>
                        You have successfully completed your registration for RCCG International Shift Talent Hunt Season 3.
                        Thank you. <br> Please find the details of your registration below: <br><br>

                        <li>Name: ${contestant.name}</li>
                        <li>Email Address: ${contestant.email}</li>
                        <li>Phone: ${contestant.telephone}</li>
                        <li>Region: ${contestant.region}</li>
                        <li>Province: ${contestant.province}</li>
                        <li>Category: ${contestant.category}</li>
                        <li>Participation: ${contestant.type}</li> <br>

                        At a later date, you'll be required to create a bank account. Click the button below to do so when the time comes,
                        but for now, congratulations and Welcome to International Shift Talent Hunt. <br><br>

                        <a href="https://rccgshift.org/register/${contestant?.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Open Bank Account </a>
                    </p>`;
            }

            const body = await generateEmailBody(contestant.name, message)

            // Retrieve competition settings
            const settings = await prisma.settings.findFirst();
            if (!settings?.current_season) {
                return errorHandler('Settings or current season not found.', 404);
            }

            await sendEmail(String(contestant.email), 'Registration Completed!', body, transporter)

        });

        return sucessHandler('Email Sent!', 200);


    } catch (error) {
        console.log(error);
        return errorHandler(`Something went wrong: ${error}`);
    }
};
