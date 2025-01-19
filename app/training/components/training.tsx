"use client";
import { useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Swal from 'sweetalert2';


const Training = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePhoneNumber = (number: any) => {
        // Basic validation: check if the phone number is 10-15 digits
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        return phoneRegex.test(number);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!validatePhoneNumber(phoneNumber)) {
            setError("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        try {
            // Simulate API call to validate phone number
            const response = await fetch("/api/training", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                let timerInterval: any;
                Swal.fire({
                    title: "Please hold on",
                    html: "We are redirecting you to the meeting",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup()?.querySelector("b");
                        timerInterval = setInterval(() => {
                            if (timer) {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = link;
                        console.log("I was closed by the timer");
                    }
                });

                // Redirect to Zoom link
                const link = data.data;
                // console.log(link);
            } else {
                // console.log(data)
                setError(data.error);
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div>

                <div className='grid'>
                    <div className='unit half'>
                        <img src="/images/training.jpg" />
                    </div>
                    <div className='unit half'>
                        <div>
                            <h5 className="borderr">Waiting Room</h5>
                            <p className="text-white">Please input your phone number to get access to the training</p>

                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                            <form onSubmit={handleSubmit} method="POST">
                                <label htmlFor="phone-number" className="text-white">Phone Number:</label>
                                <input
                                    id="phone-number"
                                    type="text"
                                    placeholder="e.g., +1234567890"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    maxLength={50}
                                    className="w-full border rounded px-4 py-2"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className='mt-5 text-white py-3 px-6' style={{ background: "#363635" }}
                                >  {loading ? "Validating..." : "Join Meeting"} </button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Training;
