'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { Isettings } from '@/app/types/settings';
import { IOfficials } from '@/app/types/officials';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
const PaystackButton = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), { ssr: false });

const CoordintorsSingleForm = ({ official, settings }: { official: IOfficials; settings: Isettings }) => {
    console.log(official);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [season, setSeason] = useState();
    const [id, setId] = useState();
    const official_session = official.official_sessions[0];
    const amount =
        official_session.amount_paid <= 0
            ? official_session.payment_amount
            : official_session.amount_to_pay - official_session.amount_paid;
    const router = useRouter();

    const componentProps = {
        email: official.email,
        amount: Number(amount) * 100,
        fname: official.name,
        publicKey: publicKey,
        text: 'Pay Now',
        metadata: {
            name: official.name,
            id: official.official_sessions[0].id,
            season: season,
            registration_type: 'coordinator',
            amount: amount,
            custom_fields: [
                {
                    display_name: 'Season',
                    variable_name: 'season',
                    value: season ? season : 'N/A',
                },
            ],
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Thank you for your payment. We are processing it. You will receive a confirmation shortly',
                confirmButtonColor: '#F5245F',
            });

            setTimeout(() => {
                router.replace('/');
            }, 2000);
        },
        onClose: () => {
            toast.error('What went wrong?');
        },
    };

    {
        /* format the amount to include commas */
    }
    const formattedAmount = amount.toLocaleString('en-US');

    return (
        <>
            <ToastContainer />
            <>
                {!official.official_sessions[0].status &&
                    official.official_sessions[0].amount_paid < official.official_sessions[0].amount_to_pay && (
                        //payment incomlete
                        <>
                            <p>
                                You have not paid the required contribution fee. Please click on the button below to pay
                                the required contribution fee which is{' '}
                                <span className="text-white">₦{formattedAmount}</span>
                            </p>
                            <div>
                                <h5 className="borderr">Step Three: Payment</h5>
                                <p>Please click on the button below to pay the required contribution fee</p>

                                <PaystackButton className="button w-100" {...componentProps}></PaystackButton>
                            </div>
                        </>
                    )}

                {/* deal with the case where the official is already paid */}
                {official.official_sessions[0].status &&
                    official.official_sessions[0].amount_paid >= official.official_sessions[0].amount_to_pay && (
                        <>
                            <p>You have already paid the required contribution fee. Thank you for your payment.</p>
                        </>
                    )}
            </>
        </>
    );
};

export default CoordintorsSingleForm;
