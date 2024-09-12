"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {}

const Details = (props: Props) => {
    const [senderName, setSenderName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        toast.loading('Please wait')
        // Handle form submission here (e.g., send the data to an API or log it)
        const formData = {
            name: senderName,
            email: senderEmail,
            phone: phoneNumber,
            message: message
        }
        try {
            const update = await fetch(
                `${apiUrl}/api/contact`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (update.ok) {
                toast.dismiss()
                toast.success('Message Sent, We will get back to you');
                router.refresh();
            } else {
                toast.dismiss()
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            toast.dismiss()
            console.error('Error:', error);
            toast.error('An error occurred');
        }

    };
    return (
        <>
            <ToastContainer />
            <div className="grid">
                <div className="unit half">
                    <p>Have an enquiry? Do not hesitate to reach out.</p>
                    <form className="form-box" onSubmit={handleSubmit}>
                        <label>Full name :</label>
                        <input
                            type="text"
                            name="senderName"
                            id="senderName"
                            required
                            maxLength={50}
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                        />

                        <label>Phone Number :</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <label>Email address :</label>
                        <input
                            type="email"
                            name="senderEmail"
                            id="senderEmail"
                            required
                            maxLength={50}
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                        />

                        <label>Message :</label>
                        <textarea
                            name="message"
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>

                        <input
                            type="submit"
                            id="sendMessage"
                            name="sendMessage"
                            value="Send Message"
                        />
                    </form>
                </div>
                <div className="unit half">
                    <img src="images/back.jpg" className="flex-img" alt="" />
                    <div className="ombre-box">
                        <ul className="ombre-table">
                            <li>
                                <div className="ombre-table-left"><i className="ombre-icon fa fa-phone-square"></i>Phone</div>
                                <div className="ombre-table-right">+447424483987, +2347060626135</div>
                            </li>
                            <li>
                                <div className="ombre-table-left"><i className="ombre-icon fa fa-envelope"></i>E-mail</div>
                                <div className="ombre-table-right"><a href="mailto:info@rccgshift.org">info@rccgshift.org</a>
                                </div>
                            </li>
                            <li>
                                <div className="ombre-table-left"><i className="ombre-icon fa fa-map"></i>Address</div>
                                <div className="ombre-table-right">Redemption City of God</div>
                            </li>
                        </ul>
                        <ul className="social-icons model-social">
                            <li>
                                <a href="https://www.facebook.com/people/Rccgshift/61551057372506/?mibextid=ibOpuV" className="fa fa-facebook-f" title="Facebook">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/rccgshift/?igsh=MTFtbWRybHRuNHp6dQ%3D%3D" className="fa fa-instagram tooltip-pink" title="Instagram">Instagram</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid-border"></div>
            <div className="grid">
                <div className="unit whole">
                    <div className="flex-iframe widescreen">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.7471371068214!2d3.442202876570088!3d6.800586819878112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bc0e98dc14de1%3A0x3d10c9c1742dbcd3!2sRedemption%20Camp%2C%20Pakuro%20110113%2C%20Ogun%20State!5e0!3m2!1sen!2sng!4v1725685842071!5m2!1sen!2sng"
                            width="800" height="600" allowFullScreen={true} loading="lazy" ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details