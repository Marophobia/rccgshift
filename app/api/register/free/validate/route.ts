import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import nodemailer from 'nodemailer';
import { generateEmailBody, sendEmail } from '@/lib/utils';
import { UserStatus } from '@/app/types/contestants';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { id, type } = data;

        if (type != 'validate') {
            return errorHandler(
                'Access Denied',
                403
            );
        }

        const contestant = await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                Group: true
            }
        })

        if (!contestant) {
            return errorHandler(
                'Contestant not found',
                402
            );
        }

        try {
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
                        <li>Tag Number : ${contestant.tag}</li>
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
                        <li>Tag Number : ${contestant.tag}</li>
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
                        <li>Tag Number : ${contestant.tag}</li>
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

                // log action
                let description = `Validation for Registration for: ${contestant.name}`;
                await prisma.logs.create({
                    data: {
                        action: 'Validation',
                        description: description,
                        amount: 0,
                        candidate: String(contestant?.id),
                        session: "Shine Festival",
                    },
                });

                // Retrieve competition settings
                const settings = await prisma.settings.findFirst();
                if (!settings?.current_season) {
                    return errorHandler('Settings or current season not found.', 404);
                }

                const highestTag = await prisma.user.findFirst({
                    where: { seasonId: settings.current_season, competitionType: contestant.competitionType },
                    orderBy: { tag: 'desc' },
                    select: { tag: true },
                });

                const nextTag = (highestTag?.tag || 0) + 1;

                // Update the user's paid status
                const update = await tx.user.update({
                    where: {
                        id: contestant?.id,
                    },
                    data: {
                        paid: 1,
                        tag: nextTag,
                        status: UserStatus.registered
                    }
                });

                // Ensure the update was successful
                if (!update) {
                    return errorHandler(
                        'Failed to update the user status.',
                        402
                    );
                }

                await sendEmail(contestant.email || '', 'Registration Completed!', body, transporter)
                return update;
            });

            return sucessHandler('Update Successful', 201);

        } catch (transactionError: any) {
            // Log the specific error that caused the transaction to fail
            console.error(
                `Transaction failed: ${transactionError.message}`,
                transactionError
            );
            return errorHandler(
                `Unable to update vote: ${transactionError.message}`,
                500
            );
        }

    } catch (error) {
        console.error('Error processing Paystack webhook:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
