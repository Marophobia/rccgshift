import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sendEmail = async (email: string, subject: string, body: string, transporter: any): Promise<boolean> => {
  try {

    // console.log(email, subject)
    
    const fromName = 'RCCG SHIFT TALENT';
    const fromEmail = 'info@rccgshift.org';

    const mailData = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: subject,
      html: body,
    };

    transporter.sendMail(mailData, function (err: Error | null, info: any) {
      if (err) {
        console.error(err);
      }
    });

    console.log(`Email sent successfully to ${email}`);

    return true;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    return false;
  }
};


export const generateEmailBody = async (name: string, message: string) => {
  return (
    `
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
                                                    style="height: 200px; background-image: url('https://rccgshift.org/images/snip.png'); background-position: center; background-repeat: no-repeat; background-size: contain;">
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

                                                  ${message}

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
    
    `
  )
}