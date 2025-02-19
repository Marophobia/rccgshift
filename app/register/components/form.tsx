'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { countries, nigerianStates } from '@/app/forms/components';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { regions } from '@/app/forms/components';
import { regionProvinces } from '@/app/forms/components';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowBigLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
const PaystackButton = dynamic(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);

const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState();
    const [season, setSeason] = useState();
    const [amount, setAmount] = useState(5000);
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [activeType, setActiveType] = useState<number | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxImageSize = 5 * 1024 * 1024; // 1MB

    const [formData, setFormData] = useState({
        profilePicture: null as string | null,
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        ageGrade: '',
        country: '',
        state: '',
        region: '',
        province: '',
        category: '',
        participation: '',
        groupName: '',
        groupsize: '',
        creativity: '',
        type: activeType,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Validate image type
            if (!allowedImageTypes.includes(selectedFile.type)) {
                toast.dismiss();
                return toast.error(
                    'Invalid image type. Please select a PNG, JPG, or JPEG file.'
                );
            }

            // Validate image size
            if (selectedFile.size > maxImageSize) {
                toast.dismiss();
                return toast.error(
                    'Image size exceeds 5MB limit. Please select a smaller file.'
                );
            }

            // Update file state and preview
            setFile(selectedFile);
            setFormData((prev) => ({
                ...prev,
                profilePicture: URL.createObjectURL(selectedFile),
            }));
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            type: activeType,
        }));
    };

    const handleNext = async () => {
        // Scroll to the top of the page with a smooth effect
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        if (currentStep === 1) {
            if (
                !formData.name ||
                !formData.email ||
                !formData.gender ||
                !formData.phoneNumber ||
                !formData.ageGrade ||
                !formData.region ||
                !formData.profilePicture ||
                !formData.province ||
                !formData.state ||
                !formData.country
            ) {
                toast.error('Please fill all required fields.');
                return;
            }

            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
            if (!agreed) {
                toast.dismiss();
                return toast.error('Please agree to the Terms and Conditions');
            }

            if (activeType === 1) {
                if (!formData.category || !formData.participation) {
                    toast.error('Please fill all required fields.');
                    return;
                }
                if (formData.participation === 'Group') {
                    if (!formData.groupName || !formData.groupsize) {
                        toast.error('Please fill all required fields.');
                        return;
                    }
                    setAmount(10000);
                }
            } else if (activeType === 2) {
                if (!formData.groupName || !formData.groupsize) {
                    toast.error('Please fill all required fields.');
                    return;
                }
                setAmount(20000);
            }

            if (!file) {
                toast.dismiss();
                return toast.error('No Image Selected!');
            }

            const data = new FormData();
            data.append('file', file);
            data.append('input', JSON.stringify(formData));

            setLoading(true);
            toast.loading('Please Wait');
            fetch(`${apiUrl}/api/register`, {
                method: 'POST',
                cache: 'no-store',
                body: data,
            })
                .then((update) => {
                    // Check if the response content-type is JSON
                    const contentType = update.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return update.json().then((response) => ({ response, update }));
                    } else {
                        // If not JSON, return the text to help debug
                        return update.text().then((text) => {
                            throw new Error(`Expected JSON but received: ${text}`);
                        });
                    }
                })
                .then(({ response, update }) => {
                    console.log('Update Query', update);
                    console.log('Finished Response', response);
                    if (update.ok) {
                        toast.dismiss();
                        setCurrentStep(currentStep + 1);
                        setTag(response.data.tag);
                        setSeason(response.data.season);
                    } else {
                        toast.dismiss();
                        toast.error(`${response.error}`);
                        console.error(`${response.error}`);
                    }
                })
                .catch((error) => {
                    toast.dismiss();
                    console.error('Error:', error);
                    toast.error(`Error: ${error.message}`);
                })
                .finally(() => {
                    setLoading(false);
                });

        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const componentProps = {
        email: formData.email,
        amount: amount * 100,
        // amount: 100 * 100,
        fname: formData.name + `(${tag})`,
        // lname: fname + `(${contestant.id})`,
        publicKey: publicKey,
        text: 'Pay Now',
        metadata: {
            name: formData.name,
            season: season,
            tag: tag,
            amount: amount,
            type: activeType,
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
                text: 'We are processing your registration. You will receive a confirmation shortly',
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

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <>
            <ToastContainer />
            {!activeType && <h5>Please select your registration type</h5>}
            <h4 className='text-red-100'>Please Note that this registration is NOT FREE!
            </h4>
            <div className="flex flex-col items-center space-y-4 pb-10 md:flex-row md:space-x-4 md:space-y-0">
                <Button
                    hidden={activeType === 2}
                    onClick={() => setActiveType(1)}
                    className={`py-5 w-full text-white transition-all ${activeType === 2 ? 'hidden' : ''
                        } ${activeType === 1
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-neutral-500 hover:bg-neutral-600'
                        }`}
                >
                    International Shift Talent Hunt
                </Button>
                <Button
                    hidden={activeType === 1}
                    onClick={() => setActiveType(2)}
                    className={`py-5 w-full text-white transition-all  ${activeType === 1 ? 'hidden' : ''
                        } ${activeType === 2
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-neutral-500 hover:bg-neutral-600'
                        }`}
                >
                    Shift Choir Competition
                </Button>
            </div>

            {activeType === 1 && (
                <>
                    <img src='/images/register.jpg' className='mb-10' />
                    <p>
                        Please fill in your details to register for the RCCG
                        Shift Talent Hunt Season 3
                    </p>
                    {currentStep === 1 && (
                        <div>
                            <h5 className="borderr">Step One: Bio Data</h5>
                            {/* Profile Picture */}
                            <div>
                                {formData.profilePicture && (
                                    <div className="mt-4">
                                        <img
                                            src={formData.profilePicture}
                                            alt="Preview"
                                            className="w-32 h-32 rounded-full object-cover mx-auto"
                                        />
                                    </div>
                                )}
                                <label
                                    htmlFor="profilePicture"
                                    className="block font-medium my-10"
                                >
                                    Profile Picture:
                                </label>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 my-10"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="name">
                                    Full Name (as it appears on your bank
                                    account):
                                </label>
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
                                <label htmlFor="phoneNumber">
                                    Phone Number (Whatsapp Only):
                                </label>
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
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
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
                                        <SelectItem value="Adult">
                                            Adult
                                        </SelectItem>
                                        <SelectItem value="Youth">
                                            Youth
                                        </SelectItem>
                                        <SelectItem value="Minor">
                                            Minor
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Country of Residence */}
                            <div className="my-10">
                                <label>Country of Residence:</label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            country: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country}
                                                value={country}
                                            >
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* State of Residence */}

                            {formData.country &&
                                (formData.country === 'Nigeria' ? (
                                    <div className="my-10">
                                        <label>State of Residence:</label>
                                        <Select
                                            value={formData.state}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    state: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {nigerianStates.map((state) => (
                                                    <SelectItem
                                                        key={state}
                                                        value={state}
                                                    >
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="my-10">
                                        <label htmlFor="state">
                                            State of Residence:
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    state: e.target.value,
                                                }))
                                            }
                                            required
                                            maxLength={50}
                                            className="w-full border rounded px-4 py-2"
                                        />
                                    </div>
                                ))}

                            {/* Select Region */}
                            <div className="my-10">
                                <label>Region</label>
                                <Select
                                    value={formData.region}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            region: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem
                                                key={region}
                                                value={`Region ${region}`}
                                            >
                                                {`Region ${region}`}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="Redemption City">
                                            Redemption City
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Conditionally render Province select if Region is selected */}
                            {formData.region &&
                                formData.region !== 'Redemption City' && (
                                    <div className="my-10">
                                        <label>Province</label>
                                        <Select
                                            value={formData.province}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    province: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Province" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(
                                                    regionProvinces[
                                                    formData.region as keyof typeof regionProvinces
                                                    ] || []
                                                ).map((province) => (
                                                    <SelectItem
                                                        key={province}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                            <button
                                onClick={handleNext}
                                className="mt-5 text-white py-3 px-6"
                                type="button"
                                style={{ background: '#363635' }}
                            >
                                {' '}
                                Proceed{' '}
                            </button>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h5 className="borderr">
                                Step Two: Competition Data
                            </h5>

                            {/* Category */}
                            <div className="my-10">
                                <label>Category:</label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            category: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Music">
                                            Music
                                        </SelectItem>
                                        <SelectItem value="Drama">
                                            Drama
                                        </SelectItem>
                                        <SelectItem value="Unusual Creativity">
                                            Unusual Creativity
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* if Unusual Creativity */}
                            {formData.category === 'Unusual Creativity' && (
                                <div>
                                    <label htmlFor="creativity">
                                        Please specify type of Creativity:
                                    </label>
                                    <input
                                        type="text"
                                        name="creativity"
                                        id="creativity"
                                        value={formData.creativity}
                                        onChange={handleChange}
                                        required
                                        maxLength={50}
                                        className="w-full border rounded px-4 py-2"
                                    />
                                </div>
                            )}

                            {/* Participation */}
                            <div className="my-10">
                                <label>Participation:</label>
                                <Select
                                    value={formData.participation}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            participation: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Participation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Single">
                                            Single
                                        </SelectItem>
                                        <SelectItem value="Group">
                                            Group
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price Disclaimer */}
                            {formData.participation &&
                                <h6 className="mt-1 text-red-50">
                                    You will be required to pay {formData.participation === 'Single' ? (<>₦5,000</>) : (<>₦10,000</>)}
                                </h6>
                            }

                            {formData.participation === 'Group' && (
                                <>
                                    <div className="mb-5">
                                        <label htmlFor="groupName">
                                            Group Name:
                                        </label>
                                        <small>
                                            Please Note that you are creating a
                                            new group and as such you are the
                                            leader.
                                        </small>
                                        <input
                                            type="text"
                                            name="groupName"
                                            id="groupName"
                                            value={formData.groupName}
                                            onChange={handleChange}
                                            required
                                            maxLength={50}
                                            className="w-full border rounded px-4"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="groupsize">
                                            Group Size:
                                        </label>
                                        <input
                                            type="number"
                                            name="groupsize"
                                            id="groupSize"
                                            value={formData.groupsize}
                                            onChange={handleChange}
                                            required
                                            maxLength={50}
                                            className="w-full border rounded px-4 py-2"
                                        />
                                    </div>
                                </>
                            )}



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

                            {agreed && (
                                <p className="mt-3">
                                    By clicking the Proceed button, I confirm
                                    that I have read, understood, and agree to
                                    be bound by the International Shift Talent
                                    Registration Terms and Conditions. I
                                    understand that my registration is subject
                                    to acceptance by the Organizer, and I agree
                                    to comply with all Event rules and
                                    instructions.
                                </p>
                            )}

                            <div className="flex gap-5">
                                <button
                                    onClick={handlePrev}
                                    className="mt-5 text-white py-3 px-6"
                                    type="button"
                                    style={{ background: '#363635' }}
                                    disabled={loading}
                                >
                                    {' '}
                                    <ArrowBigLeft />{' '}
                                </button>

                                <button
                                    type="button"
                                    id="register"
                                    name="register"
                                    className="mt-5 text-white py-3 px-6"
                                    style={{ background: '#363635' }}
                                    onClick={handleNext}
                                    disabled={loading}
                                >
                                    {' '}
                                    Proceed{' '}
                                </button>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <h5 className="borderr">Step Three: Payment</h5>
                            <p>
                                Please click on the button below to pay the
                                required registration fee
                            </p>

                            <PaystackButton
                                className="button w-100"
                                {...componentProps}
                            ></PaystackButton>
                        </div>
                    )}
                </>
            )}

            {activeType === 2 && (
                <>
                    <img src='/images/choir.jpg' className='mb-10' />

                    <p>
                        Please fill in your details to register for the RCCG
                        Shift Choir Competition
                    </p>
                    {currentStep === 1 && (
                        <div>
                            <h5 className="borderr">Step One: Bio Data</h5>
                            {/* Profile Picture */}
                            <div>
                                {formData.profilePicture && (
                                    <div className="mt-4">
                                        <img
                                            src={formData.profilePicture}
                                            alt="Preview"
                                            className="w-32 h-32 rounded-full object-cover mx-auto"
                                        />
                                    </div>
                                )}
                                <label
                                    htmlFor="profilePicture"
                                    className="block font-medium my-10"
                                >
                                    Profile Picture:
                                </label>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 my-10"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="name">
                                    Full Name (as it appears on your bank
                                    account):
                                </label>
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
                                <label htmlFor="phoneNumber">
                                    Phone Number (Whatsapp Only):
                                </label>
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
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
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
                                        <SelectItem value="Adult">
                                            Adult
                                        </SelectItem>
                                        <SelectItem value="Youth">
                                            Youth
                                        </SelectItem>
                                        <SelectItem value="Minor">
                                            Minor
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Country of Residence */}
                            <div className="my-10">
                                <label>Country of Residence:</label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            country: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country}
                                                value={country}
                                            >
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* State of Residence */}

                            {formData.country &&
                                (formData.country === 'Nigeria' ? (
                                    <div className="my-10">
                                        <label>State of Residence:</label>
                                        <Select
                                            value={formData.state}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    state: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {nigerianStates.map((state) => (
                                                    <SelectItem
                                                        key={state}
                                                        value={state}
                                                    >
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="my-10">
                                        <label htmlFor="state">
                                            State of Residence:
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    state: e.target.value,
                                                }))
                                            }
                                            required
                                            maxLength={50}
                                            className="w-full border rounded px-4 py-2"
                                        />
                                    </div>
                                ))}

                            {/* Select Region */}
                            <div className="my-10">
                                <label>Region</label>
                                <Select
                                    value={formData.region}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            region: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem
                                                key={region}
                                                value={`Region ${region}`}
                                            >
                                                {`Region ${region}`}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="Redemption City">
                                            Redemption City
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Conditionally render Province select if Region is selected */}
                            {formData.region &&
                                formData.region !== 'Redemption City' && (
                                    <div className="my-10">
                                        <label>Province</label>
                                        <Select
                                            value={formData.province}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    province: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Province" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(
                                                    regionProvinces[
                                                    formData.region as keyof typeof regionProvinces
                                                    ] || []
                                                ).map((province) => (
                                                    <SelectItem
                                                        key={province}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                            <button
                                onClick={handleNext}
                                className="mt-5 text-white py-3 px-6"
                                type="button"
                                style={{ background: '#363635' }}
                            >
                                {' '}
                                Proceed{' '}
                            </button>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h5 className="borderr">
                                Step Two: Competition Data
                            </h5>

                            <div className="mb-5">
                                <label htmlFor="groupName">Choir Name:</label>
                                <small>
                                    Please Note that you are creating a new
                                    choir group and as such you are the leader.
                                </small>
                                <input
                                    type="text"
                                    name="groupName"
                                    id="groupName"
                                    value={formData.groupName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-4"
                                />
                            </div>

                            <div>
                                <label htmlFor="groupsize">
                                    Choir Size (At least 20):
                                </label>
                                <input
                                    type="number"
                                    name="groupsize"
                                    id="groupSize"
                                    value={formData.groupsize}
                                    onChange={handleChange}
                                    min="20"
                                    required
                                    className="w-full border rounded px-4 py-2"
                                />
                            </div>

                            {formData.groupName &&
                                <h6 className="mt-1 text-red-50">
                                    You will be required to pay ₦20,000
                                </h6>
                            }

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

                            {agreed && (
                                <p className="mt-3">
                                    By clicking the Proceed button, I confirm
                                    that I have read, understood, and agree to
                                    be bound by the International Shift Talent
                                    Registration Terms and Conditions. I
                                    understand that my registration is subject
                                    to acceptance by the Organizer, and I agree
                                    to comply with all Event rules and
                                    instructions.
                                </p>
                            )}

                            <div className="flex gap-5">
                                <button
                                    onClick={handlePrev}
                                    className="mt-5 text-white py-3 px-6"
                                    type="button"
                                    style={{ background: '#363635' }}
                                    disabled={loading}
                                >
                                    {' '}
                                    <ArrowBigLeft />{' '}
                                </button>

                                <button
                                    type="button"
                                    id="register"
                                    name="register"
                                    className="mt-5 text-white py-3 px-6"
                                    style={{ background: '#363635' }}
                                    onClick={handleNext}
                                    disabled={loading}
                                >
                                    {' '}
                                    Proceed{' '}
                                </button>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <h5 className="borderr">Step Three: Payment</h5>
                            <p>
                                Please click on the button below to pay the
                                required registration fee
                            </p>

                            <PaystackButton
                                className="button w-100"
                                {...componentProps}
                            ></PaystackButton>
                        </div>
                    )}
                </>
            )}


            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                {/* <AlertDialogTrigger asChild>
                    <h3>Click me</h3>
                </AlertDialogTrigger> */}
                <AlertDialogContent style={{ background: "#16171E", border: "none" }}>
                    <AlertDialogHeader>
                        <div className="bg-gray-800 border-l-4 border-yellow-400 p-4 rounded-lg my-5 text-left">
                            <h3 className="text-yellow-400 font-semibold text-lg mb-3">
                                Important Notice: Registration Fee Required
                            </h3>
                            <p className="text-gray-200 mb-3">
                                Please note that this registration is <strong className="text-yellow-400">NOT FREE</strong>. A registration fee is required to complete your application. The fee varies based on the category you select:
                            </p>
                            <ul className="list-disc list-inside text-gray-200 mb-3 pl-5">
                                <li><strong className="text-yellow-400">International Shift (Single):</strong> ₦5,000</li>
                                <li><strong className="text-yellow-400">International Shift (Group):</strong> ₦10,000</li>
                                <li><strong className="text-yellow-400">Shift Choir Competition:</strong> ₦20,000</li>
                            </ul>
                            <p className="text-gray-200 mb-3">
                                <strong className="text-yellow-400">Do not proceed with registration unless you are ready and willing to pay the required fee.</strong> Failure to pay will result in an incomplete registration.
                            </p>
                            <p className="text-gray-200">
                                By proceeding, you acknowledge and agree to the payment terms outlined above.
                            </p>
                        </div>
                    </AlertDialogHeader>
                    <div className="overflow-auto max-h-[50vh] mb-4">

                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction className='bg-red-500 border-red-500 text-white sm:my-0 my-2'>
                            <Link href="/">
                                I do not Agree
                            </Link>
                        </AlertDialogAction>
                        <AlertDialogCancel className='bg-green-500 border-green-500 text-white sm:my-0 my-2'>
                            I Agree
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default RegistrationForm;
