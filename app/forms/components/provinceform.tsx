'use client';
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { regions } from '@/app/forms/components';
import { regionProvinces } from '@/app/forms/components';

type Props = {};

const ProvinceForm = (props: Props) => {
    const [region, setRegion] = useState('');
    const [province, setProvince] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [shiftCoordinator, setShiftCoordinator] = useState('');
    const [shiftCoordinatorPhone, setShiftCoordinatorPhone] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        toast.loading("Please Wait")
        e.preventDefault();
        const formData = {
            region,
            province,
            name,
            phone,
            shiftCoordinator,
            shiftCoordinatorPhone,
        };

        try {
            const update = await fetch(`${apiUrl}/api/forms/provincial_pastor`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (update.ok) {
                toast.dismiss()
                toast.success('Form Submitted, Thanks!');
                router.refresh();
            } else if (update.status === 409) {
                toast.dismiss()
                toast.error(
                    `${update.statusText}: Pastor / Shift Coordninator already exists for this Province`
                );
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
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Select Region */}
                    <div className="my-5">
                        <label>Region</label>
                        <Select onValueChange={(value) => setRegion(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                {regions.map((region) => (
                                    <SelectItem
                                        key={region}
                                        value={`${region}`}
                                    >
                                       {region}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Conditionally render Province select if Region 35 is selected */}
                    {region && region !== 'Redemption City' && (
                        <div className="my-5">
                            <label>Province</label>
                            <Select onValueChange={(value) => setProvince(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>

                                    {regionProvinces[region as keyof typeof regionProvinces].map((province) => (
                                        <SelectItem key={province} value={province}>
                                            {province}
                                        </SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Name of Provincial Youth Pastor */}
                    <div>
                        <label>Name of Provincial Youth Pastor</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    {/* Phone of Provincial Youth Pastor */}
                    <div>
                        <label>Phone of Provincial Youth Pastor</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>

                    {/* Name of Provincial Shift Coordinator */}
                    <div>
                        <label>Name of Provincial Shift Coordinator</label>
                        <input
                            type="text"
                            value={shiftCoordinator}
                            onChange={(e) =>
                                setShiftCoordinator(e.target.value)
                            }
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    {/* Phone of Provincial Shift Coordinator */}
                    <div>
                        <label>Phone of Provincial Shift Coordinator</label>
                        <input
                            type="tel"
                            value={shiftCoordinatorPhone}
                            onChange={(e) =>
                                setShiftCoordinatorPhone(e.target.value)
                            }
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProvinceForm;
