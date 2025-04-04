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
import { IDepartments } from '@/app/types/officials';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
const PaystackButton = dynamic(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);
import { OfficialType } from '@/app/types/officials';

const CoordintorsForm = ({ departments }: { departments: IDepartments[] }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [season, setSeason] = useState();
    const [id, setId] = useState();
    const [amount, setAmount] = useState(100000);
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({
        amount: '',
        amount_paid: '',
    });

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxImageSize = 5 * 1024 * 1024; // 1MB

    const [formData, setFormData] = useState({
        profilePicture: null as string | null,
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        country: '',
        state: '',
        region: '',
        province: '',
        type: '',
        department: '',
        position: '',
        amount: '',
        amount_paid: '',
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
        setFormData((prev) => {
            let newValue = value;

            // Validate 'amount'
            if (name === 'amount') {
                if (Number(value) < 100000) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        amount: 'Amount must be at least ₦100,000',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        amount: '',
                    }));
                }
            }

            // Validate 'amount_paid'
            if (name === 'amount_paid') {
                if (Number(formData.amount) < 100000 || Number(value) < Number(prev.amount) * 0.5) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        amount_paid: 'Amount must be at least 50% of the total amount',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        amount_paid: '',
                    }));
                }
            }

            return {
                ...prev,
                [name]: newValue,
            };
        });
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
                !formData.profilePicture ||
                !formData.state ||
                !formData.country
            ) {
                toast.error('Please fill all required fields.');
                return;
            }

            setCurrentStep(currentStep + 1);

        } else if (currentStep === 2) {
            if (!formData.region ||
                !formData.province ||
                !formData.type ||
                !formData.amount) {
                toast.dismiss();
                return toast.error('Please fill all required fields');
            }

            if (formData.type === 'Shift Executive') {
                if (!formData.department ||
                    !formData.position) {
                    toast.dismiss();
                    return toast.error('Please fill all required fields');
                }
            }

            if (Number(formData.amount) < 100000) {
                toast.dismiss();
                return toast.error('Amount must be at least ₦100,000');
            }

            if (Number(formData.amount_paid) < Number(formData.amount) * 0.5) {
                toast.dismiss();
                return toast.error('Amount must be at least 50% of the total amount');
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
            fetch(`${apiUrl}/api/register/coordinators`, {
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
                        setSeason(response.data.season);
                        setId(response.data.id);
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
        amount: Number(formData.amount_paid) * 100,
        // amount: 100 * 100,
        fname: formData.name,
        // lname: fname + `(${contestant.id})`,
        publicKey: publicKey,
        text: 'Pay Now',
        metadata: {
            name: formData.name,
            id: id,
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
            <>
                <p>
                    Please fill in your details to register as a Coordinator / Executive
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
                            Step Two: Shift Data
                        </h5>

                        {/* Category */}
                        <div className="my-10">
                            <label>Type:</label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        type: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={OfficialType.shift_executive}>
                                        Shift Executive
                                    </SelectItem>
                                    <SelectItem value={OfficialType.regional_shift_coordinator}>
                                        Shift Regional Coordinator
                                    </SelectItem>
                                    <SelectItem value={OfficialType.assistant_regional_shift_coordinator}>
                                        Assistant Shift Regional Coordinator
                                    </SelectItem>
                                    <SelectItem value={OfficialType.provincial_shift_coordinator}>
                                        Shift Provincial Coordinator
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* if Unusual Creativity */}
                        {formData.type === OfficialType.shift_executive && (
                            <>

                                <div>
                                    <label htmlFor="position">
                                        Position:
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        id="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        maxLength={50}
                                        placeholder='E.g Director, Assistant Director, etc'
                                        className="w-full border rounded px-4 py-2"
                                    />
                                </div>

                                {/* Select Department */}
                                <div className="my-10">
                                    <label>Department</label>
                                    <Select
                                        value={formData.department}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                department: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departments.map((department) => (
                                                <SelectItem
                                                    key={department.id}
                                                    value={department.id.toString()}
                                                >
                                                    {`${department.name}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}

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
                                            value={`${region}`}
                                        >
                                            {`${region}`}
                                        </SelectItem>
                                    ))}
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

                        {/* Participation */}
                        <div className="my-10">
                            <label>Amount to Contribute (At least ₦100,000):</label>
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                className={`w-full border rounded px-4 py-2 ${
                                    errors.amount ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
                        </div>

                        {formData.amount && (
                            <div className="my-10">
                                <label>Amount you want to pay now (At least 50%):</label>
                                <input
                                    type="number"
                                    name="amount_paid"
                                    id="amount_paid"
                                    value={formData.amount_paid}
                                    onChange={handleChange}
                                    required
                                    className={`w-full border rounded px-4 py-2 ${
                                        errors.amount_paid ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.amount_paid && (
                                    <p className="text-red-500">{errors.amount_paid}</p>
                                )}
                            </div>
                        )}

                        {!errors.amount_paid && formData.amount_paid && formData.amount && Number(formData.amount_paid) >= Number(formData.amount) * 0.5 && Number(formData.amount_paid) < Number(formData.amount) && (
                            <p className="text-green-500">Remaining amount: ₦{Number(formData.amount) - Number(formData.amount_paid)}, 
                            You can pay the remaining amount later</p>
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
                            required contribution fee
                        </p>

                        <PaystackButton
                            className="button w-100"
                            {...componentProps}
                        ></PaystackButton>
                    </div>
                )}
            </>


        </>
    );
};

export default CoordintorsForm;
