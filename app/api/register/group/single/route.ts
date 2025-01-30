import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { UserStatus } from '@/app/types/contestants';
import { generateEmailBody, sendEmail } from '@/lib/utils';
import nodemailer from 'nodemailer';


export const POST = async (req: Request) => {
    const { name, email, phoneNumber, gender, ageGrade, groupId } = await req.json();

    try {
        // Validate request data
        if (!name || !email || !phoneNumber || !gender || !ageGrade || !groupId) {
            return errorHandler('All fields are required.', 400);
        }

        //get the group
        const group = await prisma.group.findFirst({
            where: {
                id: groupId
            },
            include: {
                GroupMembers: true
            }
        })

        if (!group) {
            return errorHandler(
                'Group Not FOund',
                409
            );
        }

        if (group?.GroupMembers.length >= group?.size - 1) {
            return errorHandler(
                'Group Already Filled',
                409
            );
        }

        // console.log(contestant)
        // Paystack API details
        // const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET;
        // const PAYSTACK_API_URL = `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=221`; // 221 is Stanbic IBTC's bank code

        // // Call Paystack API
        // const paystackResponse = await fetch(PAYSTACK_API_URL, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        //         'Content-Type': 'application/json',
        //     },
        // });

        // // Handle Paystack response
        // if (!paystackResponse.ok) {
        //     const error = await paystackResponse.json();
        //     console.log(error)
        //     return errorHandler(error.message || 'Failed to verify account.', paystackResponse.status);
        // }

        // const { data } = await paystackResponse.json();
        // // console.log(data)
        // const accountName = data.account_name;
        // const accountNumber = data.account_number

        // Compare the account name with the provided name
        // if (accountName.toLowerCase() === name.toLowerCase()) {
        // const responseData = { accountName, accountNumber: account };

        const settings = await prisma.settings.findFirst();

        // Check if the user is already registered for this season
        const contestantExists = await prisma.user.findFirst({
            where: { email, seasonId: settings?.current_season },
        });

        const groupMemberExists = await prisma.groupMembers.findFirst({
            where: { email, seasonId: settings?.current_season },
        });

        if (contestantExists || groupMemberExists) {
            return errorHandler(
                'This email is already registered for the competition.',
                409
            );
        }

        await prisma.groupMembers.create({
            data: {
                name,
                email,
                telephone: phoneNumber,
                gender,
                age_grade: ageGrade,
                // account_number: accountNumber,
                groupId,
                paid: 1,
                seasonId: settings?.current_season,
                status: UserStatus.approved
            }
        })

        let message = `<p> You have successfully completed your registration for RCCG International Shift talent Hunt Season 3. 
                            Thank you. <br> You are currently registered under ${group.name} as one of the group members
                            <br> Please find the details of your registration below <br>

                            <li>Name: ${name}</li>
                            <li>Email Address: ${email}</li>
                            <li>Phone: ${phoneNumber}</li>
                            <li>Group: ${group.name}</li>
                            <li>Group Size: ${group.size}</li>

                </p>`


        const transporter = nodemailer.createTransport({
            port: 465,
            host: "mail.privateemail.com",
            auth: {
                user: 'info@rccgshift.org',
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        const body = await generateEmailBody(name, message)
        await sendEmail(email, 'Registration Completed!', body, transporter)

        return sucessHandler('Account verified successfully.', 200);

        // } else {
        //     return errorHandler('Account name does not match.', 400);
        // }
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`, 500);
    }
};
