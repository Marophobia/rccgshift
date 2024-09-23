import prisma from '@/lib/db';
import { errorHandler, sucessHandler } from '@/lib/functions';
import nodemailer from 'nodemailer';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET; // Your secret key

export const POST = async (req: Request) => {
    const { data, reference } = await req.json();
    const { id, vote, email } = data;

    if (!id || !vote || !email || !reference) {
        return errorHandler('Missing Vote or Reference', 400);
    }

    // Verify transaction with Paystack
    try {
        const verifyResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const verifyData = await verifyResponse.json();

        if (!verifyData.status || verifyData.data.status !== 'success') {
            return errorHandler('Transaction verification failed', 400);
        }

        const transporter = nodemailer.createTransport({
            port: 465,
            host: 'mail.privateemail.com',
            auth: {
                user: 'info@rccgshift.org',
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        const fromName = 'RCCG SHIFT TALENT';
        const fromEmail = 'info@rccgshift.org';

        const mailData = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: 'Vote Placed!',
            html: `

         <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <td bgcolor="#F9F1E6" align="left" valign="top" style="padding-top: 30px; padding-left: 20px;">
                </td>
            </table>
        </td>
    </tr>
    <tr></tr>
    <tr style="max-width: 600;">
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600;">
                <tr>
                    <td bgcolor="#ffffff" align="center"
                        style="height: 200px; background-image: url('https://rccgshift.org/images/mail.png'); background-position: center; background-repeat: no-repeat; background-size: contain;">
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="left"
                        style="padding: 20px 30px 0px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
                        <p style="margin: 0;"><b>Hello,</b></p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left"
                        style="padding: 20px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
                        <p style="margin: 0;">
                           We have received your payment for ${vote} votes, and your number of votes for the current round has been updated successfully </p>
                        <p>
                            In the meantime, if you have any urgent matters or enquires, feel free to reply
                            to this email.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left"
                        style="padding: 5px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
                        <p style="margin: 0;"><b>Best Regards, <br> RCCG SHIFT</b></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#F9F1E6" align="center" style="padding: 10px;">
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#F9F1E6" align="center" valign="top"
                        style="padding-top: 50px; padding-bottom: 10px; margin: 0; width: 30%;">
                        <a href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV">
                            <img src="https://www.rccgyayaglobal.org/images/facebook.png" width="15" />
                        </a>
                        <a href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D">
                            <img src="https://www.rccgyayaglobal.org/images/instagram.png" width="15" />
                        </a>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#F9F1E6" align="center" valign="top"
                        style="padding: 5px 30px 5px 30px; color: #000000; font-family: 'Poppins', sans-serif; font-size: 16px;">
                        <p style="margin: 0;">© 2024 <a href="https://www.rccgshift.org"
                                style="margin: 0; text-decoration: none; color: #000000;">rccgshift.org</a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding: 0px 10px 20px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
                        <a href="https://rccgshift.org/"
                            style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">Home</a>
                    </td>
                    <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
                        <a href="https://rccgshift.org/about"
                            style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">About
                            Us</a>
                    </td>
                    <td bgcolor="#F9F1E6" align="center" valign="top" style="padding: 30px 30px;">
                        <a href="https://rccgshift.org/contestants"
                            style="color: #000000; margin: 0; font-family: 'Poppins', sans-serif; text-decoration: none;">Contestants</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
 
        `,
        };

        transporter.sendMail(mailData, function (err: Error | null, info: any) {
            if (err) {
                console.error(err);
                return errorHandler(`Unable to send mail`, 500);
            }
        });

        // Start a transaction to handle the vote update process
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
                    throw new Error(
                        'Current round settings could not be fetched.'
                    );
                }

                if (!current_round.round) {
                    throw new Error('Current round data is missing.');
                }

                if (!current_round.round.status) {
                    throw new Error('Current voting round is not active.');
                }

                // Fetch the user with their current voting session
                const user = await tx.user.findFirst({
                    where: {
                        id: id,
                    },
                    include: {
                        user_sessions: true,
                    },
                });

                // Validate if user and their voting sessions exist
                if (!user) {
                    throw new Error(`User with ID ${id} not found.`);
                }

                if (!user.user_sessions || user.user_sessions.length === 0) {
                    throw new Error('No voting session found for this user.');
                }

                // Fetch the current session for the active round directly from the DB
                const userCurrentSession = await tx.user_session.findFirst({
                    where: {
                        user_id: id,
                        round_id: current_round.current_round,
                    },
                });

                // Validate if the user session for the current round exists
                if (!userCurrentSession) {
                    throw new Error(
                        `User session for round ${current_round.current_round} not found.`
                    );
                }

                // Check if vote value is valid and a positive number
                if (typeof vote !== 'number' || vote <= 0) {
                    throw new Error(
                        'Invalid vote value. It must be a positive number.'
                    );
                }

                // Update the user's votes in the transaction
                const update = await tx.user_session.update({
                    where: {
                        id: userCurrentSession.id,
                    },
                    data: {
                        votes: {
                            increment: vote,
                        },
                    },
                });

                // Ensure the update was successful
                if (!update) {
                    throw new Error('Failed to update the user session votes.');
                }

                console.log(
                    `User with id: ${update.user_id} updated with: ${vote}`
                );

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
    } catch (error) {
        console.error(`General error: ${error}`);
        return errorHandler(`Something went wrong with the server: ${error}`);
    }
};
