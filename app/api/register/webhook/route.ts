import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import nodemailer from 'nodemailer';
import { generateEmailBody, sendEmail } from '@/lib/utils';

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

            const { name, season, tag, amount, type } = event.data.metadata;
            console.log(event.data.metadata)

            const contestant = await prisma.user.findFirst({
                where: {
                    tag,
                    seasonId: season,
                    competitionType: type
                },
                include: {
                    Group: true
                }
            })

            if (!contestant){
                return errorHandler(
                    'Contestant not found',
                    402
                );
            }

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

                    let message
                    type === 2 || contestant.type === 'Group' ? (
                        message = `<p> You have successfully completed your registration for RCCG International Shift talent Hunt Season 3. 
                            Thank you. <br> Please find the details of your registration below <br>

                            <li>Name: ${contestant.name}</li>
                            <li>Email Address: ${contestant.email}</li>
                            <li>Phone: ${contestant.telephone}</li>
                            <li>Region: ${contestant.region}</li>
                            <li>Province: ${contestant.province}</li>
                            <li>Category: ${contestant.category}</li>
                            <li>Participation: ${contestant.type}</li>  <br>

                            You have choosen to participate as a group with the name ${contestant.Group?.name}. Please give the following
                            link to your team members to register. This link must not be shared with anyone else. Thanks. <br><br>

                             <a href="https://rccgshift.org/register/group/${contestant.Group?.id}" 
                                style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                                color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                                border-radius: 5px;"> Click Here </a> <br>

                                At a later date, you'll be required to create a bank account. 
                                click the button below to do so, but for now, congratulations and Welcome to International Shift Talent Hunt

                             <a href="https://rccgshift.org/register/${contestant?.tag}" 
                                style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                                color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                                border-radius: 5px;"> Open Bank Account </a> 

                </p>`
                    ) : (
                        message = `<p> You have successfully completed your registration for RCCG International Shift talent Hunt Season 3. 
                            Thank you. <br> Please find the details of your registration below <br>

                            <li>Name: ${contestant.name}</li>
                            <li>Email Address: ${contestant.email}</li>
                            <li>Phone: ${contestant.telephone}</li>
                            <li>Region: ${contestant.region}</li>
                            <li>Province: ${contestant.province}</li>
                            <li>Category: ${contestant.category}</li>
                            <li>Participation: ${contestant.type}</li> 

                            At a later date, you'll be required to create a bank account.
                            click the button below to do so, but for now, congratulations and Welcome to International Shift Talent Hunt

                             <a href="https://rccgshift.org/register/${contestant?.tag}" 
                                style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                                color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                                border-radius: 5px;"> Open Bank Account </a> 
                </p>`
                    )

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

                    // Update the user's paid status
                    const update = await tx.user.update({
                        where: {
                            id: contestant?.id,
                        },
                        data: {
                            paid: 1
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
