import nodemailer from 'nodemailer';
const PASSWORD = process.env.PASSWORD;
import { errorHandler, sucessHandler } from '@/lib/functions';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, phone, email, message } = data;

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
            subject: 'We have received your message!',
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
                        <p style="margin: 0;"><b>Hello ${name},</b></p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left"
                        style="padding: 20px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
                        <p style="margin: 0;">
                            Thank you for reaching out to us! Your message has been received, and we greatly appreciate
                            you taking the time to
                            contact us. </p>

                        <p> We are committed to serving our community and will respond to your inquiry as soon as
                            possible. Our team will
                            carefully
                            review your message and provide a thoughtful response to address your needs or concerns.
                        </p>

                        <p>

                            In the meantime, if you have any urgent matters or additional questions, feel free to reply
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

        const mailData2 = {
            from: `"${fromName}" <${fromEmail}>`,
            to: 'info@rccgshift.org',
            subject: 'New Contact Message!',
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
                        <p style="margin: 0;"><b>Hello Admin,</b></p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left"
                        style="padding: 20px 30px 20px 30px; color: black; font-family: 'Poppins', sans-serif; font-size: 20px;">
                        <p style="margin: 0;">
                            You have a new message from the contact form on the SHIFT website: </p>

                        <li>Name: ${name}</li>
                        <li>Email: ${email}</li>
                        <li>Phone: ${phone}</li>
                        <li>Message: ${message}</li>

                        <p>

                            Please do well to respond. Thanks and God bless!
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

        transporter.sendMail(
            mailData2,
            function (err: Error | null, info: any) {
                if (err) {
                    console.error(err);
                    return errorHandler(`Unable to send mail`, 500);
                } else {
                    return sucessHandler('Success', 200);
                }
            }
        );

        return sucessHandler('Success', 200);
    } catch (error) {
        console.error(error);
        return errorHandler(`Error`, 500);
    }
}
