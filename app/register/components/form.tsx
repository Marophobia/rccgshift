"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { countries, nigerianStates } from '@/app/forms/components';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
// import { regions } from '@/app/forms/components';
// import { regionProvinces } from '@/app/forms/components';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowBigLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
const PaystackButton = dynamic(
    () => import('react-paystack').then((mod) => mod.PaystackButton),
    { ssr: false }
);

const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [tag, setTag] = useState()
    const [season, setSeason] = useState()
    const [amount, setAmount] = useState(5000)
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);

    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxImageSize = 3 * 1024 * 1024; // 3MB

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
        groupsize: ''
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Validate image type
            if (!allowedImageTypes.includes(selectedFile.type)) {
                toast.dismiss();
                return toast.error("Invalid image type. Please select a PNG, JPG, or JPEG file.");
            }

            // Validate image size
            if (selectedFile.size > maxImageSize) {
                toast.dismiss();
                return toast.error("Image size exceeds 3MB limit. Please select a smaller file.");
            }

            // Update file state and preview
            setFile(selectedFile);
            setFormData((prev) => ({
                ...prev,
                profilePicture: URL.createObjectURL(selectedFile),
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const regions = Array.from({ length: 59 }, (_, i) => i + 1);

    const regionProvinces = {
        'Region 1': [
            'Regional Headquaters',
            'Lagos Province 1',
            'Lagos Province 11',
            'Lagos Province 41',
            'Lagos Province 70',
            'Lagos Province 79',
            'Lagos Province 73',
            'Lagos Province 93',
            'Lagos Province 103',
            'Lagos Province 110',
            'Lagos Province 124',
        ],
        'Region 2': [
            'Regional Headquaters',
            'Lagos Province 8',
            'Lagos Province 9',
            'Lagos Province 104',
            'Lagos Province 13',
            'Lagos Province 50',
            'Lagos Province 56',
            'Lagos Province 87',
            'Lagos Province 84',
            'Lagos Province 95',
            'Lagos Province 111',
            'Lagos Province 112',
            'Lagos Province 125',
        ],
        'Region 3': [
            'Regional Headquaters',
            'Osun Province 2',
            'Osun Province 3',
            'Osun Province 5',
            'Osun Province 7',
            'Osun Province 8',
            'Osun Province 9',
            'Osun Province 11',
            'Osun Province 12',
            'Osun Province 14',
            'Osun Province 16',
        ],
        'Region 4': [
            'Regional Headquaters',
            'Kwara Province 1',
            'Kwara Province 2',
            'Kwara Province 3',
            'Kwara Province 4',
            'Kwara Province 5',
            'Kwara Province 6',
            'Kwara Province 7',
            'Kwara Province 8',
        ],
        'Region 5': [
            'Regional Headquaters',
            'Rivers Province 1',
            'Rivers Province 4',
            'Rivers Province 6',
            'Rivers Province 9',
            'Rivers Province 14',
            'Rivers Province 15',
            'Rivers Province 16',
            'Rivers Province 19',
        ],
        'Region 6': [
            'Regional Headquaters',
            'Ebonyi Province 1',
            'Ebonyi Province 2',
            'Enugu Province 1',
            'Enugu Province 2',
            'Enugu Province 3',
            'Enugu Province 4',
            'Enugu Province 5',
        ],
        'Region 7': [
            'Regional Headquaters',
            'Adamawa Province',
            'Taraba Province 1',
            'Taraba Province 2',
        ],
        'Region 8': [
            'Regional Headquaters',
            'Plateau Province 1',
            'Plateau Province 2',
            'Plateau Province 3',
            'Plateau Province 4',
            'Plateau Province 5',
        ],
        'Region 9': [
            'Regional Headquaters',
            'Jigawa Province 1',
            'Kano Province 1',
            'Kano Province 2',
            'Katsina Province 1',
        ],
        'Region 10': [
            'Regional Headquaters',
            'FCT Province 1',
            'FCT Province 4',
            'FCT Province 6',
            'FCT Province 12',
            'FCT Province 13',
            'FCT Province 15',
            'FCT Province 19',
            'FCT Province 22',
        ],
        'Region 11': [
            'Regional Headquaters',
            'Lagos Province 6',
            'Lagos Province 16',
            'Lagos Province 20',
            'Lagos Province 21',
            'Lagos Province 53',
            'Lagos Province 65',
            'Lagos Province 88',
            'Lagos Province 114',
        ],
        'Region 12': [
            'Regional Headquaters',
            'Ogun Province 4',
            'Ogun Province 5',
            'Ogun Province 8',
            'Ogun Province 11',
            'Ogun Province 18',
            'Ogun Province 20',
            'Ogun Province 22',
            'Ogun Province 23',
            'Ogun Province 30',
            'Ogun Province 31',
            'Ogun Province 32',
            'Ogun Province 33',
            'Ogun Province 36',
        ],
        'Region 13': [
            'Regional Headquaters',
            'Edo Province 1',
            'Edo Province 2',
            'Edo Province 4',
            'Edo Province 6',
            'Edo Province 9',
            'Edo Province 11',
            'Edo Province 13',
            'Edo Province 15',
            'Edo Province 16',
            'Edo Province 19',
        ],
        'Region 14': [
            'Regional Headquaters',
            'Akwa Ibom Province 3',
            'Akwa Ibom Province 5',
            'Akwa Ibom Province 6',
            'Akwa Ibom Province 7',
            'Akwa Ibom Province 9',
        ],
        'Region 15': [
            'Regional Headquaters',
            'Abia Province 1',
            'Abia Province 2',
            'Abia Province 3',
            'Abia Province 4',
            'Abia Province 5',
            'Abia Province 6',
        ],
        'Region 16': [
            'Regional Headquaters',
            'Borno Province 1',
            'Yobe Province 1',
        ],
        'Region 17': [
            'Regional Headquaters',
            'Bauchi Province 1',
            'Gombe Province 1',
        ],
        'Region 18': [
            'Regional Headquaters',
            'Kebbi Province 1',
            'Sokoto Province 1',
            'Zamfara Province 1',
        ],
        'Region 19': [
            'Regional Headquaters',
            'Lagos Province 2',
            'Lagos Province 23',
            'Lagos Province 27',
            'Lagos Province 32',
            'Lagos Province 40',
            'Lagos Province 60',
            'Lagos Province 77',
            'Lagos Province 89',
            'Lagos Province 92',
            'Lagos Province 115',
            'Lagos Province 116',
            'Lagos Province 126',

        ],
        'Region 20': [
            'Regional Headquaters',
            'Lagos Province 4',
            'Lagos Province 15',
            'Lagos Province 24',
            'Lagos Province 34',
            'Lagos Province 35',
            'Lagos Province 39',
            'Lagos Province 47',
            'Lagos Province 119',
        ],
        'Region 21': [
            'Regional Headquaters',
            'Oyo Province 1',
            'Oyo Province 2',
            'Oyo Province 5',
            'Oyo Province 10',
            'Oyo Province 11',
            'Oyo Province 12',
            'Oyo Province 13',
            'Oyo Province 14',
            'Oyo Province 15',
            'Oyo Province 16',
            'Oyo Province 17',
            'Oyo Province 19',
            'Oyo Province 21',
            'Oyo Province 23',
            'Oyo Province 24',

        ],
        'Region 22': [
            'Regional Headquaters',
            'Ondo Province 1',
            'Ondo Province 3',
            'Ondo Province 4',
            'Ondo Province 7',
            'Ondo Province 8',
            'Ondo Province 9',
            'Ondo Province 11',
            'Ondo Province 13',
            'Ondo Province 16',
            'Ondo Province 17',
            'Ondo Province 20',
        ],
        'Region 23': [
            'Regional Headquaters',
            'Delta Province 1',
            'Delta Province 2',
            'Delta Province 5',
            'Delta Province 6',
            'Delta Province 12',
            'Delta Province 13',
            'Delta Province 16',
            'Delta Province 20',
            'Delta Province 21',
            'Delta Province 23',
            'Delta Province 25',
        ],
        'Region 24': [
            'Regional Headquaters',
            'Kogi Province 1',
            'Kogi Province 2',
            'Kogi Province 3',
            'Kogi Province 4',
            'Kogi Province 5',
            'Kogi Province 6',
            'Kogi Province 7',
        ],
        'Region 25': [
            'Regional Headquaters',
            'Ekiti Province 1',
            'Ekiti Province 2',
            'Ekiti Province 3',
            'Ekiti Province 4',
            'Ekiti Province 5',
            'Ekiti Province 6',
            'Ekiti Province 7',
            'Ekiti Province 8',
            'Ekiti Province 9',
            'Ekiti Province 10',
            'Ekiti Province 11',
            'Ekiti Province 12',
        ],
        'Region 26': [
            'Regional Headquaters',
            'Lagos Province 22',
            'Lagos Province 33',
            'Lagos Province 41',
            'Lagos Province 55',
            'Lagos Province 58',
            'Lagos Province 62',
            'Lagos Province 63',
            'Lagos Province 75',
            'Lagos Province 97',
            'Lagos Province 98',
            'Lagos Province 99',
            'Lagos Province 107',
        ],
        'Region 27': [
            'Regional Headquaters',
            'Bayelsa Province 1',
            'Bayelsa Province 2',
            'Bayelsa Province 3',
            'Bayelsa Province 4',
            'Bayelsa Province 5',
        ],
        'Region 28': [
            'Regional Headquaters',
            'Nasarawa Province 1',
            'Nasarawa Province 2',
            'Nasarawa Province 3',
            'Nasarawa Province 4',
            'Nasarawa Province 5',
            'Nasarawa Province 6',
        ],
        'Region 29': [
            'Regional Headquaters',
            'Cross River Province 1',
            'Cross River Province 2',
            'Cross River Province 4',
            'Cross River Province 5',
            'Cross River Province 7',
        ],
        'Region 30': [
            'Regional Headquaters',
            'Kaduna Province 1',
            'Kaduna Province 2',
            'Kaduna Province 3',
            'Kaduna Province 4',
            'Kaduna Province 5',
            'Kaduna Province 6',
        ],
        'Region 31': [
            'Regional Headquaters',
            'Lagos Province 7',
            'Lagos Province 25',
            'Lagos Province 29',
            'Lagos Province 37',
            'Lagos Province 52',
            'Lagos Province 59',
            'Lagos Province 68',
            'Lagos Province 78',
            'Lagos Province 80',
            'Lagos Province 101',
            'Lagos Province 102',
            'Lagos Province 108',
            'Lagos Province 120',
        ],
        'Region 32': [
            'Regional Headquaters',
            'Ogun Province 1',
            'Ogun Province 6',
            'Ogun Province 7',
            'Ogun Province 12',
            'Ogun Province 15',
            'Ogun Province 16',
            'Ogun Province 19',
            'Ogun Province 26',
            'Ogun Province 28',
            'Ogun Province 34',
            'Ogun Province 35',

        ],
        'Region 33': [
            'Regional Headquaters',
            'Rivers Province 2',
            'Rivers Province 3',
            'Rivers Province 8',
            'Rivers Province 11',
            'Rivers Province 12',
            'Rivers Province 16',
            'Rivers Province 17',
            'Rivers Province 21',
            'Rivers Province 23',
        ],
        'Region 34': [
            'Regional Headquaters',
            'Delta Province 3',
            'Delta Province 7',
            'Delta Province 9',
            'Delta Province 14',
            'Delta Province 15',
            'Delta Province 17',
        ],
        'Region 35': [
            'Regional Headquaters',
            'Youth Province 1',
            'Youth Province 2',
            'Youth Province 3',
            'Youth Province 4',
            'Youth Province 5',
            'Youth Province 6',
            'Youth Province 7',
            'Youth Province 8',
            'Youth Province 9',
            'Youth Province 10',
            'Youth Province 11',
            'Youth Province 12',
            'Youth Province 13',
            'Youth Province 14',
            'Youth Province 15',
            'Youth Province 16',
            'Youth Province 17',
            'Youth Province 18',
        ],
        'Region 36': [
            'Regional Headquaters',
            'Lagos Province 109',
            'Lagos Province 12',
            'Lagos Province 18',
            'Lagos Province 30',
            'Lagos Province 31',
            'Lagos Province 38',
            'Lagos Province 72',
            'Lagos Province 90',
            'Lagos Province 91',
            'Lagos Province 94',
        ],
        'Region 37': [
            'Regional Headquaters',
            'Lagos Province 10',
            'Lagos Province 17',
            'Lagos Province 28',
            'Lagos Province 42',
            'Lagos Province 49',
            'Lagos Province 57',
            'Lagos Province 83',
            'Lagos Province 86',
            'Lagos Province 96',
            'Lagos Province 123',
        ],
        'Region 38': [
            'Regional Headquaters',
            'Edo Province 3',
            'Edo Province 5',
            'Edo Province 7',
            'Edo Province 8',
            'Edo Province 10',
            'Edo Province 12',
            'Edo Province 14',
            'Edo Province 17',
            'Edo Province 18',
        ],
        'Region 39': [
            'Regional Headquaters',
            'Ondo Province 2',
            'Ondo Province 5',
            'Ondo Province 6',
            'Ondo Province 10',
            'Ondo Province 12',
            'Ondo Province 14',
            'Ondo Province 15',
            'Ondo Province 18',
            'Ondo Province 19',
            'Ondo Province 21',
        ],
        'Region 40': [
            'Regional Headquaters',
            'Benue Province 1',
            'Benue Province 2',
            'Benue Province 3',
            'Benue Province 4',
            'Benue Province 5',
        ],
        'Region 41': [
            'Regional Headquaters',
            'Niger Province 1',
            'Niger Province 2',
            'Niger Province 3',
            'Niger Province 4',
            'Niger Province 5',
        ],
        'Region 42': [
            'Regional Headquaters',
            'Oyo Province 3',
            'Oyo Province 4',
            'Oyo Province 6',
            'Oyo Province 7',
            'Oyo Province 8',
            'Oyo Province 9',
            'Oyo Province 18',
            'Oyo Province 20',
            'Oyo Province 22',
        ],
        'Region 43': [
            'Regional Headquaters',
            'Osun Province 1',
            'Osun Province 4',
            'Osun Province 6',
            'Osun Province 10',
            'Osun Province 13',
            'Osun Province 15',
        ],
        'Region 44': [
            'Regional Headquaters',
            'Ogun Province 3',
            'Ogun Province 10',
            'Ogun Province 14',
            'Ogun Province 17',
            'Ogun Province 21',
            'Ogun Province 25',
            'Ogun Province 27',
        ],
        'Region 45': [
            'Regional Headquaters',
            'FCT Province 2',
            'FCT Province 5',
            'FCT Province 7',
            'FCT Province 8',
            'FCT Province 14',
            'FCT Province 16',
            'FCT Province 21',
        ],
        'Region 46': [
            'Regional Headquaters',
            'FCT Province 3',
            'FCT Province 9',
            'FCT Province 10',
            'FCT Province 11',
            'FCT Province 17',
            'FCT Province 18',
            'FCT Province 20',
        ],
        'Region 47': [
            'Regional Headquaters',
            'Anambra Province 1',
            'Anambra Province 2',
            'Anambra Province 3',
            'Anambra Province 4',
        ],
        'Region 48': [
            'Regional Headquaters',
            'Imo Province 1',
            'Imo Province 2',
            'Imo Province 3',
            'Imo Province 4',
        ],
        'Region 49': [
            'Regional Headquaters',
            'Akwa Ibom Province 2',
            'Akwa Ibom Province 4',
            'Akwa Ibom Province 11',
            'Akwa Ibom Province 12',
        ],
        'Region 50': [
            'Regional Headquaters',
            'Delta Province 4',
            'Delta Province 8',
            'Delta Province 10',
            'Delta Province 11',
            'Delta Province 18',
            'Delta Province 19',
            'Delta Province 22',
        ],
        'Region 51': [
            'Regional Headquaters',
            'Lagos Province 5',
            'Lagos Province 46',
            'Lagos Province 48',
            'Lagos Province 66',
            'Lagos Province 67',
        ],
        'Region 52': [
            'Regional Headquaters',
            'Lagos Province 26',
            'Lagos Province 31',
            'Lagos Province 45',
            'Lagos Province 71',
            'Lagos Province 74',
            'Lagos Province 82',
            'Lagos Province 109',
        ],
        'Region 53': [
            'Regional Headquaters',
            'Lagos Province 14',
            'Lagos Province 51',
            'Lagos Province 69',
            'Lagos Province 85',
            'Lagos Province 105',
            'Lagos Province 106',
        ],
        'Region 54': [
            'Lagos Province 3',
            'Lagos Province 32',
            'Lagos Province 44',
            'Lagos Province 61',
            'Lagos Province 14',
            'Lagos Province 81',
            'Lagos Province 117',
            'Lagos Province 118',
        ],
        'Region 55': [
            'Regional Headquaters',
            'Rivers Province 5',
            'Rivers Province 7',
            'Rivers Province 10',
            'Rivers Province 13',
            'Rivers Province 20',
            'Rivers Province 22',
        ],
        'Region 56': [
            'Regional Headquaters',
            'Cross-Rivers Province 3',
            'Cross-Rivers Province 6',
            'Cross-Rivers Province 8',
            'Cross-Rivers Province 9',
        ],
        'Region 57': [
            'Regional Headquaters',
            'Akwa Ibom Province 1',
            'Akwa Ibom Province 8',
            'Akwa Ibom Province 10',
            'Akwa Ibom Province 13',
        ],
        'Region 58': [
            'Ogun Province 2',
            'Ogun Province 9',
            'Ogun Province 13',
            'Ogun Province 24',
            'Ogun Province 29',
            'Ogun Province 32',
        ],
        'Region 59': [
            'Lagos Province 19',
            'Lagos Province 21',
            'Lagos Province 36',
            'Lagos Province 54',
            'Lagos Province 64',
            'Lagos Province 76',
            'Lagos Province 100',
            'Lagos Province 113',
        ],
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

            if (
                !formData.category ||
                !formData.participation
            ) {
                toast.error('Please fill all required fields.');
                return;
            }

            if (formData.participation === 'Group') {
                if (
                    !formData.groupName ||
                    !formData.groupsize
                ) {
                    toast.error('Please fill all required fields.');
                    return;
                }
                setAmount(10000)
            }

            if (!file) {
                toast.dismiss()
                return toast.error("No Image Selected!")
            }

            const data = new FormData()
            data.append('file', file)
            data.append('input', JSON.stringify(formData))

            setLoading(true)
            toast.loading("Please Wait")
            try {
                const update = await fetch(`${apiUrl}/api/register`, {
                    method: 'POST',
                    cache: 'no-store',
                    // headers: { 'Content-Type': 'application/json' },
                    body: data,
                });

                const response = await update.json()

                if (update.ok) {
                    toast.dismiss()
                    setCurrentStep(currentStep + 1);
                    setTag(response.data.tag)
                    setSeason(response.data.season)

                } else {
                    toast.dismiss()
                    toast.error(`${response.error}`);
                    return
                }
            } catch (error: any) {
                toast.dismiss()
                console.error('Error:', error);
                toast.error('An error occurred');
                return
            } finally {
                setLoading(false)
            }

        };
    }

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const componentProps = {
        email: formData.email,
        amount: amount * 100,
        fname: formData.name + `(${tag})`,
        // lname: fname + `(${contestant.id})`,
        publicKey: publicKey,
        text: 'Pay Now',
        metadata: {
            name: formData.name,
            season: season,
            tag: tag,
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
                text: 'We are processing your registration. You will receive a confirmation shortly with instructions on how to complete your registration.',
                confirmButtonColor: '#F5245F',
            });

            setTimeout(() => {
                router.replace('/')
            }, 2000);
        },
        onClose: () => {
            toast.error('What went wrong?');
        },
    };

    return (
        <>
            <ToastContainer />
            <p>Please fill in your details to register for the RCCG Shift Talent Hunt Season 3</p>

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
                        <label htmlFor="profilePicture" className="block font-medium my-10">
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
                        <label htmlFor="phoneNumber">Phone Number:</label>
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
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* State of Residence */}

                    {formData.country && (
                        formData.country === 'Nigeria' ? (
                            <div className="my-10">
                                <label>State of Residence:</label>
                                <Select
                                    value={formData.state}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            state: value,
                                        }))
                                    }>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nigerianStates.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="my-10">
                                <label htmlFor="state">State of Residence:</label>
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
                        )
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

                            }>
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
                    {formData.region && formData.region !== 'Redemption City' && (
                        <div className="my-10">
                            <label>Province</label>
                            <Select
                                value={formData.province}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        province: value,
                                    }))
                                }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(regionProvinces[formData.region as keyof typeof regionProvinces] || []).map((province) => (
                                        <SelectItem key={province} value={province}>
                                            {province}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <button onClick={handleNext} className='mt-5 text-white py-3 px-6' type='button' style={{ background: "#363635" }}> Proceed </button>

                </div>
            )}

            {currentStep === 2 && (
                <div>
                    <h5 className="borderr">Step Two: Competition Data</h5>

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
                                <SelectItem value="Music">Music</SelectItem>
                                <SelectItem value="Drama">Drama</SelectItem>
                                <SelectItem value="Unusual Creativity">Unusual Creativity</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

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
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Group">Group</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.participation === 'Group' && (
                        <>
                            <div className='mb-5'>
                                <label htmlFor="groupName">Group Name:</label>
                                <small>Please Note that you are creating a new group and as such you are the leader.</small>
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
                                <label htmlFor="groupsize">Group Size:</label>
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

                    <div className='flex gap-5'>
                        <button onClick={handlePrev} className='mt-5 text-white py-3 px-6' type='button' style={{ background: "#363635" }} disabled={loading}> <ArrowBigLeft /> </button>

                        <button
                            type='button'
                            id="register"
                            name="register"
                            className='mt-5 text-white py-3 px-6' style={{ background: "#363635" }}
                            onClick={handleNext}
                            disabled={loading}
                        > Proceed </button>
                    </div>
                </div>
            )}

            {currentStep === 3 && (
                <div>
                    <h5 className="borderr">Step Three: Payment</h5>
                    <p>Please click on the button below to pay the required registration fee</p>

                    <PaystackButton
                        className="button w-100"
                        {...componentProps}
                    ></PaystackButton>

                </div>
            )}

        </>
    );
};

export default RegistrationForm;
