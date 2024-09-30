import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import nodemailer from 'nodemailer';

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
            .update(buf)
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
            const voterEmail = event.data.customer.email;

            const {session, vote, email, name, amount} = event.data.metadata

            // Implement your logic to update votes or handle the transaction
            // console.log(`Transaction successful for ${email} with reference: ${reference} and amount: ${amount}`);
            try {
                const result = await prisma.$transaction(async (tx) => {
                    // Fetch the current round settings
                    const current_round = await tx.settings.findFirst({
                        include: {
                            round: true,
                        },
                    });

                    // Check if current_round or round status is null or inactive
                    if (!current_round) {
                        return errorHandler(
                            'Current round settings could not be fetched.',
                            404
                        );
                    }

                    if (!current_round.round) {
                        return errorHandler('Current round data is missing.', 404);
                    }

                    if (!current_round.round.status) {
                        return errorHandler(
                            'Current voting round is not active.',
                            401
                        );
                    }

                    // send success mail
//                     const transporter = nodemailer.createTransport({
//                         port: 465,
//                         host: 'mail.privateemail.com',
//                         auth: {
//                             user: 'info@rccgshift.org',
//                             pass: process.env.PASSWORD,
//                         },
//                         secure: true,
//                     });

//                     const fromName = 'RCCG SHIFT TALENT';
//                     const fromEmail = 'info@rccgshift.org';

//                     const mailData = {
//                         from: `"${fromName}" <${fromEmail}>`,
//                         to: email,
//                         subject: 'Vote Placed!',
//                         html: `

//          <table border="0" cellpadding="0" cellspacing="0" width="100%">
//     <tr>
//         <td align="center" style="padding: 0px 10px 0px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                 <td bgcolor="#F9F1E6" align="left" valign="top" style="padding-top: 30px; padding-left: 20px;">
//                 </td>
//             </table>
//         </td>
//     </tr>
//     <tr></tr>
//     <tr style="max-width: 600;">
//         <td align="center" style="padding: 0px 10px 0px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600;">
//                 <tr>
//                     <td bgcolor="#ffffff" align="center"
//                         style="height: 200px; background-image: url('https://rccgshift.org/images/mail.png'); background-position: center; background-repeat: no-repeat; background-size: contain;">
//                     </td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     <tr>
//         <td align="center" style="padding: 0px 10px 0px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                 <tr>
//                     <td bgcolor="#ffffff" align="left"
//                         style="padding: 20px 30px 0px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
//                         <p style="margin: 0;"><b>Hello,</b></p>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td bgcolor="#ffffff" align="left"
//                         style="padding: 20px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
//                         <p style="margin: 0;">
//                            We have received your payment for ${vote} votes, and your number of votes for the current round has been updated successfully </p>
//                         <p>
//                             In the meantime, if you have any urgent matters or enquires, feel free to reply
//                             to this email.
//                         </p>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td bgcolor="#ffffff" align="left"
//                         style="padding: 5px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
//                         <p style="margin: 0;"><b>Best Regards, <br> RCCG SHIFT</b></p>
//                     </td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     <tr>
//         <td align="center" style="padding: 0px 10px 0px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                 <tr>
//                     <td bgcolor="#F9F1E6" align="center" style="padding: 10px;">
//                     </td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     <tr>
//         <td align="center" style="padding: 0px 10px 0px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                 <tr>
//                     <td bgcolor="#F9F1E6" align="center" valign="top"
//                         style="padding-top: 50px; padding-bottom: 10px; margin: 0; width: 30%;">
//                         <a href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV">
//                             <img src="https://www.rccgyayaglobal.org/images/facebook.png" width="15" />
//                         </a>
//                         <a href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D">
//                             <img src="https://www.rccgyayaglobal.org/images/instagram.png" width="15" />
//                         </a>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td bgcolor="#F9F1E6" align="center" valign="top"
//                         style="padding: 5px 30px 5px 30px; color: #000000; font-family: 'Poppins', sans-serif; font-size: 16px;">
//                         <p style="margin: 0;">© 2024 <a href="https://www.rccgshift.org"
//                                 style="margin: 0; text-decoration: none; color: #000000;">rccgshift.org</a></p>
//                     </td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     <tr>
//         <td align="center" style="padding: 0px 10px 20px 10px;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//                 <tr>
//                     <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
//                         <a href="https://rccgshift.org/"
//                             style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">Home</a>
//                     </td>
//                     <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
//                         <a href="https://rccgshift.org/about"
//                             style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">About
//                             Us</a>
//                     </td>
//                     <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
//                         <a href="https://rccgshift.org/contestants"
//                             style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">Contestants</a>
//                     </td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
// </table>
 
//         `,
//                     };

//                     transporter.sendMail(
//                         mailData,
//                         function (err: Error | null, info: any) {
//                             if (err) {
//                                 console.error(err);
//                                 return errorHandler(`Unable to send mail`, 500);
//                             }
//                         }
//                     );

                    // log action
                    let description = `Payment: #${amount}, Reference: ${reference} from: ${name}, For user with id: ${session.user_id} 
                Comfirmed updated with: ${vote} votes for session: ${current_round.round.name}`;
                    await prisma.logs.create({
                        data: {
                            action: 'Payment',
                            description: description,
                            amount: amount,
                            candidate: String(session.user_id),
                            session: String(current_round.round.name),
                        },
                    });

                    // Update the user's votes in the transaction
                    const update = await tx.user_session.update({
                        where: {
                            id: session.id,
                        },
                        data: {
                            votes: {
                                increment: vote,
                            },
                        },
                    });

                    // Ensure the update was successful
                    if (!update) {
                        return errorHandler(
                            'Failed to update the user session votes.',
                            402
                        );
                    }

                    return update;
                });

                return sucessHandler('Vote Successful', 201);
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
