import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { UserStatus } from '@/app/types/contestants';
import { generateEmailBody, sendEmail } from '@/lib/utils';
import nodemailer from 'nodemailer';


export const POST = async (req: Request) => {
    const { account, contestant } = await req.json();

    try {
        // Validate request data
        if (!account || !contestant) {
            return errorHandler('Account number and name are required.', 400);
        }

        // console.log(contestant)

        // Paystack API details
        const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET;
        const PAYSTACK_API_URL = `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=221`; // 221 is Stanbic IBTC's bank code

        // Call Paystack API
        const paystackResponse = await fetch(PAYSTACK_API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Handle Paystack response
        if (!paystackResponse.ok) {
            const error = await paystackResponse.json();
            console.log(error)
            return errorHandler(error.message || 'Failed to verify account.', paystackResponse.status);
        }

        const { data } = await paystackResponse.json();
        // console.log(data)
        const accountName = data.account_name;
        const accountNumber = data.account_number

        // Compare the account name with the provided name
        if (accountName.toLowerCase() === contestant.name.toLowerCase()) {
            const responseData = { accountName, accountNumber: account };

            await prisma.user.update({
                where: {
                    id: contestant.id
                },
                data: {
                    status: UserStatus.approved,
                    account_number: accountNumber
                }
            })
            let message
            contestant.type === 'Group' ? (
                message = `<p> You have successfully completed your registration for RCCG International Shift talent Hunt Season 3. 
                            Thank you. <br> Please find the details of your registration below <br>

                            <li>Name: ${contestant.name}</li>
                            <li>Email Address: ${contestant.email}</li>
                            <li>Phone: ${contestant.phone}</li>
                            <li>Region: ${contestant.region}</li>
                            <li>Province: ${contestant.province}</li>
                            <li>Category: ${contestant.category}</li>
                            <li>Participation: ${contestant.Participation}</li>  <br>

                            You have choosen to participate as a group with the name ${contestant.Group.name}. Please give the following
                            link to your team members to register. This link must not be shared with anyone else. Thanks. <br><br>

                             <a href="https://rccgshift.org/register/group/${contestant.Group.id}" 
                                style="display: inline-block; font-family: 'Poppins', sans-serif; font-size: 18px; 
                                color: #ffffff; text-decoration: none; background-color: #4CAF50; padding: 15px 25px; 
                                border-radius: 5px;"> Click Here </a>

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
                </p>`
            )

            const transporter = nodemailer.createTransport({
                port: 465,
                host: "mail.privateemail.com",
                auth: {
                    user: 'info@rccgshift.org',
                    pass: process.env.PASSWORD,
                },
                secure: true,
            });

            const body = await generateEmailBody(contestant.name, message)
            await sendEmail(contestant.email, 'Registration Completed!', body, transporter)

            return sucessHandler('Account verified successfully.', 200, responseData);
        } else {
            return errorHandler('Account name does not match.', 400);
        }
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
