import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import nodemailer from 'nodemailer';
import { generateEmailBody, sendEmail } from '@/lib/utils';
import { UserStatus } from '@/app/types/contestants';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET || ''; // Ensure this is set in your environment variables

export async function POST(req: NextRequest) {
    try {
        // Read the request body as an ArrayBuffer
        const arrayBuffer = await req.arrayBuffer();

        // Convert ArrayBuffer to Buffer
        const buf = Buffer.from(arrayBuffer);

        // Retrieve Paystack signature from headers
        const paystackSignature = req.headers.get('x-paystack-signature');

        if (!paystackSignature) {
            console.error('Paystack signature missing');
            return NextResponse.json(
                { error: 'Paystack signature missing' },
                { status: 400 }
            );
        }

        // Create the hash using the secret key
        const hash = crypto
            .createHmac('sha512', PAYSTACK_SECRET_KEY)
            .update(new Uint8Array(buf))
            .digest('hex');

        // Check if the hash matches the signature
        if (hash !== paystackSignature) {
            console.error('Invalid signature');
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Parse the event data
        const event = JSON.parse(buf.toString());

        // Process the event (example: update vote count, etc.)
        // Example processing:
        if (event.event === 'charge.success') {
            const reference = event.data.reference;
            // const amount = event.data.amount / 100;
            const email = event.data.customer.email;

            if (event.data.metadata.registration_type === 'contestant') {

                const { name, season, tag, amount, type } = event.data.metadata;

                console.log(event.data.metadata)


                const contestant = await prisma.user.findFirst({
                    where: {
                        id: tag
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

                console.log("Contestant", contestant)

                try {

                    const updateUserStatus = await prisma.$transaction(async (tx) => {

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

                        if (type === 2) {
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
                        } else if (type === 1) {
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

                        console.log(message)
                        const body = await generateEmailBody(name, message)

                        // log action
                        let description = `Payment for Registration: #${amount}, Reference: ${reference} for: ${name}`;
                        await prisma.logs.create({
                            data: {
                                action: 'Payment',
                                description: description,
                                amount: amount,
                                candidate: String(contestant?.id),
                                session: "Audition One",
                            },
                        });

                        // Retrieve competition settings
                        const settings = await prisma.settings.findFirst();
                        if (!settings?.current_season) {
                            return errorHandler('Settings or current season not found.', 404);
                        }

                        const highestTag = await prisma.user.findFirst({
                            where: { seasonId: settings.current_season, competitionType: type },
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
                                tag: nextTag
                                // status: UserStatus.approved
                            }
                        });

                        // Ensure the update was successful
                        if (!update) {
                            return errorHandler(
                                'Failed to update the user status.',
                                402
                            );
                        }

                        await sendEmail(email, 'Registration Completed!', body, transporter)
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

            } else if (event.data.metadata.registration_type === 'coordinator') {

                const { name, season, id, amount, type } = event.data.metadata;
                console.log(event.data.metadata)

                const officialSession = await prisma.official_Session.findFirst({
                    where: {
                        id: id,
                        seasonId: season
                    },
                    include: {
                        official: true
                    }
                })

                if (!officialSession) {
                    return errorHandler('Official Session not found', 402);
                }

                try {

                    const updateCoordinatorStatus = await prisma.$transaction(async (tx) => {
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

                        if (officialSession.amount_to_pay > (amount + officialSession.amount_paid)) {
                            //Partial Payment
                            message = `<p>
                        You have successfully paid ${amount} for your contribution as an Executive / Coordinator for 
                        RCCG International Shift Talent Hunt Season 3.
                        Thank you. 
                        
                        <br> Please find the details of your registration below: <br><br>

                        <li>Name: ${officialSession.official.name}</li>
                        <li>Email Address: ${officialSession.official.email}</li>
                        <li>Phone: ${officialSession.official.phone}</li>
                        <li>Region: ${officialSession.region}</li>
                        <li>Province: ${officialSession.province}</li> <br>

                        You have made an installmental Payment of ${amount} of ${officialSession.amount_to_pay}. 
                        You can continue your registration by paying the remaining balance of ${officialSession.amount_to_pay - (amount + officialSession.amount_paid)}.
                        <br>
                        <br>

                        <a href="https://rccgshift.org/register/coordinator/${officialSession.official.id}" 
                        style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                        color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                        border-radius: 5px;"> Continue Payment </a> <br><br> `


                            const update = await tx.official_Session.update({
                                where: {
                                    id: officialSession.id
                                },
                                data: {
                                    amount_paid: amount
                                }
                            })

                            if (!update) {
                                return errorHandler('Failed to update the official session status.', 402);
                            }

                        } else if (officialSession.amount_to_pay === (amount + officialSession.amount_paid)) {
                            //Full Payment
                            message = `
                            <p>
                                You have successfully completed your payment as an Executive / Coordinator for RCCG International Shift Talent Hunt Season 3.
                                Thank you. <br> Please find the details of your registration below: <br><br>

                                <li>Name: ${officialSession.official.name}</li>
                                <li>Email Address: ${officialSession.official.email}</li>
                                <li>Phone: ${officialSession.official.phone}</li>
                                <li>Region: ${officialSession.region}</li>
                                <li>Province: ${officialSession.province}</li> <br>

                                You have made a full payment by paying ${amount} for your contribution, Thank you and God Bless!
                                </p>`;

                            const update = await tx.official_Session.update({
                                where: {
                                    id: officialSession.id
                                },
                                data: {
                                    amount_paid: amount + officialSession.amount_paid,
                                    status: true
                                }
                            })

                            //update the official status
                            const updateOfficial = await tx.officials.update({
                                where: {
                                    id: officialSession.official.id
                                },
                                data: { status: true }
                            })

                            if (!update) {
                                return errorHandler('Failed to update the official session status.', 402);
                            }
                        }
            
                    const body = await generateEmailBody(name, message)
                    await sendEmail(email, 'Registration Update!', body, transporter)
                   
                })

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

            }
        }

        // Return a success response
        return NextResponse.json({ message: 'Event processed successfully' });

    } catch (error) {
        console.error('Error processing Paystack webhook:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
