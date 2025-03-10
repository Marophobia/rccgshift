"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowBigLeft, Settings, SquareArrowUpRight } from 'lucide-react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { Icontestants, IGroup, UserStatus } from '@/app/types/contestants';
import { Isettings } from '@/app/types/settings';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { group } from 'console';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import TermsAndConditionsDialog from './termsConditions';

type Props = {
    group: IGroup
    settings: Isettings
}

const RegistrationSingleGroupForm = (data: Props) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [agreed, setAgreed] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        ageGrade: '',
        account: '',
        groupId: data.group.id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleNext = async () => {

    //     // Scroll to the top of the page with a smooth effect
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });

    //     if (currentStep === 1) {
    //         if (
    //             !formData.name ||
    //             !formData.email ||
    //             !formData.gender ||
    //             !formData.phoneNumber ||
    //             !formData.ageGrade
    //         ) {
    //             toast.error('Please fill all required fields.');
    //             return;
    //         }

    //         setCurrentStep(currentStep + 1);
    //     }
    // }

    // const handlePrev = () => {
    //     setCurrentStep(currentStep - 1);
    // };


    const handleSubmit = async () => {
        setLoading(true);

        if (!agreed) {
            toast.dismiss()
            return toast.error("Please agree to the Terms and Conditions")
        }

        toast.loading("Please Wait")
        try {
            const response = await fetch('/api/register/group/single', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
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

            <div>
                <h5>You are registering under {data.group.name} group. Please fill in your details</h5>
            </div>

            {currentStep === 1 && (
                <div>
                    <h5 className="borderr">Bio Data</h5>
                    <div>
                        <label htmlFor="name">Full Name (as it appears on your bank account):</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            maxLength={50}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            maxLength={50}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number (Whatsapp Only):</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    {/* Gender */}
                    <div className="my-10">
                        <label>Gender:</label>
                        <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    gender: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Age Grade */}
                    <div className="my-10">
                        <label>Age Grade:</label>
                        <Select
                            value={formData.ageGrade}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    ageGrade: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Age Grade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Adult">Adult</SelectItem>
                                <SelectItem value="Youth">Youth</SelectItem>
                                <SelectItem value="Teen">Teen</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center gap-3 mt-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <input
                                    type="checkbox"
                                    id="agree"
                                    checked={agreed}
                                    className="w-5 h-5 cursor-pointer accent-[#F5245F]" // Change color here
                                />
                            </AlertDialogTrigger>
                            <AlertDialogContent style={{ background: "#16171E", border: "none" }}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Terms and Conditions
                                    </AlertDialogTitle>
                                    {/* <AlertDialogDescription></AlertDialogDescription> */}
                                </AlertDialogHeader>
                                <div className="overflow-auto max-h-[50vh] mb-4">
                                    <TermsAndConditionsDialog />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={(e) =>
                                            setAgreed(false)
                                        }
                                    >
                                        I do not Agree
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={(e) => setAgreed(true)}
                                        className='bg-green-500'
                                    >
                                        I Agree
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <label htmlFor="agree" className="mt-2">
                            I agree to Shift{' '} Terms and Conditions
                        </label>
                    </div>

                    {agreed &&
                        <p className='mt-3'>By clicking the Proceed button, I confirm that I have read, understood, and agree to be bound by the International Shift Talent
                            Registration Terms and Conditions. I understand that my registration is subject to acceptance by the Organizer,
                            and I agree to comply with all Event rules and instructions.</p>
                    }

                    {/* <button onClick={handleNext} className='mt-5 text-white py-3 px-6' type='button' style={{ background: "#363635" }}> Proceed </button> */}
                    <button
                        type='button'
                        className='my-5 text-white py-3 px-6' style={{ background: "#363635" }}
                        onClick={handleSubmit}
                        disabled={loading}
                    > Register </button>
                </div>

            )}

            {/* {currentStep === 2 && (
                <div>
                    <h5 className="borderr">Step Two: Account Opening</h5>
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

                    <div className='flex gap-5'>
                        <button onClick={handlePrev} className='my-5 text-white py-2 px-6' type='button' style={{ background: "#363635" }} disabled={loading}> <ArrowBigLeft /> </button>

                        <button
                            type='button'
                            className='my-5 text-white py-3 px-6' style={{ background: "#363635" }}
                            onClick={handleSubmit}
                            disabled={loading}
                        > Complete Registration </button>
                    </div>
                </div>
            )} */}

        </>
    );
};

export default RegistrationSingleGroupForm;
