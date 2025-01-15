"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowBigLeft, Settings, SquareArrowUpRight } from 'lucide-react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { Icontestants, UserStatus } from '@/app/types/contestants';
import { Isettings } from '@/app/types/settings';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
const PaystackButton = dynamic(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);

type Props = {
    contestant: Icontestants
    settings: Isettings
}

const RegistrationSingleForm = (data: Props) => {

    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(5000)
    const router = useRouter()
    // console.log(data.contestant)

    const [formData, setFormData] = useState({
        account: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (data.contestant.type === 'Group') {
            setAmount(10000)
        }
    }, [data.contestant]);


    const componentProps = {
        email: data.contestant.email,
        // amount: amount * 100,
        amount: 10 * 100,
        fname: data.contestant.name + `(${data.contestant.tag})`,
        // lname: fname + `(${contestant.id})`,
        publicKey: publicKey,
        text: 'Pay Now',
        metadata: {
            name: data.contestant.name,
            season: data.settings.current_season,
            tag: data.contestant.tag,
            amount: amount,
            custom_fields: [
                {
                    display_name: 'Season',
                    variable_name: 'season',
                    value: data.settings.current_season ? data.settings.current_season : 'N/A',
                },
            ],
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'We are processing your registration. You will receive a confirmation shortly with instructions on how to complete your registration.',
                confirmButtonColor: '#F5245F',
            });

            setTimeout(() => {
                router.refresh()
            }, 10000);
        },
        onClose: () => {
            toast.error('What went wrong?');
        },
    };

    const handleSubmit = async () => {
        setLoading(true);

        toast.loading("Please Wait")
        try {
            const response = await fetch('/api/verify-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account: formData.account,
                    contestant: data.contestant,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.dismiss()
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully completed the registration process. Thank you',
                    confirmButtonColor: '#F5245F',
                });
                setTimeout(() => {
                    router.replace('/')
                }, 2000);
            } else {
                toast.dismiss()
                toast.error(`${result.error}`);
                return
            }
        } catch (error) {
            console.error('Error verifying account:', error);
            alert('An error occurred while verifying the account.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <ToastContainer />

            {data.contestant.status === UserStatus.approved &&
                <h3>You have already completed your registration! Thank you!</h3>
            }

            {data.contestant.status === UserStatus.registered && data.contestant.paid === 0 && (
                <div>

                    <p>Welcome to the Final Phase of the International Shift Registration for Season 3</p>

                    <h5 className="borderr">Step Three: Payment</h5>
                    <p>Please click on the button below to pay the required registration fee</p>

                    <PaystackButton
                        className="button w-100"
                        {...componentProps}
                    ></PaystackButton>

                </div>
            )}

            {data.contestant.status === UserStatus.registered && data.contestant.paid === 1 && (
                <div>
                    <p>Welcome to the Final Phase of the International Shift Registration for Season 3</p>

                    <h5 className="borderr">Step Four: Account Opening</h5>
                    <p>You will be redirected to Stanbic IBTC&apos;s Secure Website to Open an account. Once you have completed the process,
                        please return to this page and put the account number to confirm and complete your registration. Please Note that
                        the name on the account must match your shift registered name.

                        If you already have a Stanbic IBTC account, just insert it and complete your registration
                    </p>

                    <a className='mt-5 text-white py-3 px-6 my-10 flex' style={{ background: "#363635" }}
                        target='_blank'
                        href='https://ienroll.stanbicibtc.com:8444/OnlineAccountOnboarding'>
                        <span className='flex gap-2'>Create Account <SquareArrowUpRight /></span>
                    </a>

                    <div>
                        <label htmlFor="account">Account Number:</label>
                        <input
                            type="number"
                            name="account"
                            id="account"
                            value={formData.account}
                            onChange={handleChange}
                            required
                            maxLength={50}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <button
                        type='button'
                        className='my-5 text-white py-3 px-6' style={{ background: "#363635" }}
                        onClick={handleSubmit}
                        disabled={loading}
                    > Complete Registration </button>

                </div>
            )}



        </>
    );
};

export default RegistrationSingleForm;
