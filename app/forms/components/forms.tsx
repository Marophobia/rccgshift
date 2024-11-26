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
import { regions, nigerianStates } from '../components/index';

const provinces = Array.from({ length: 19 }, (_, i) => `Youth Province ${i + 1}`);

type Props = {};

const PastorsForm = (props: Props) => {
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
    const [province, setProvince] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [shiftCoordinator, setShiftCoordinator] = useState('');
    const [shiftCoordinatorPhone, setShiftCoordinatorPhone] = useState('');
    const [assistantShiftCoordinator, setAssistantShiftCoordinator] =
        useState('');
    const [assistantShiftCoordinatorPhone, setAssistantShiftCoordinatorPhone] =
        useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        toast.loading("Please Wait")
        e.preventDefault();
        const formData = {
            region,
            state,
            province, // Include province in form data
            name,
            phone,
            shiftCoordinator,
            shiftCoordinatorPhone,
            assistantShiftCoordinator,
            assistantShiftCoordinatorPhone,
        };

        try {
            const update = await fetch(`${apiUrl}/api/forms/regional_pastor`, {
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
                    `${update.statusText}: Pastor / Shift Coordninator already exists for this Region`
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
                                        value={`Region ${region}`}
                                    >
                                        Region {region}
                                    </SelectItem>
                                ))}
                                <SelectItem value="Redemption City">
                                    Redemption City
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Conditionally render Province select if Region 35 is selected */}
                    {/* {region === 'Region 35' && (
                        <div className="my-5">
                            <label>Province</label>
                            <Select onValueChange={(value) => setProvince(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map((province) => (
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
                    )} */}

                    {/* Select State */}
                    <div className="my-5">
                        <label>State of Region</label>
                        <Select onValueChange={(value) => setState(value)}>
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

                    {/* Name of Regional Youth Pastor */}
                    <div>
                        <label>Name of Regional Youth Pastor</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    {/* Phone of Regional Youth Pastor */}
                    <div>
                        <label>Phone of Regional Youth Pastor</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>

                    {/* Name of Regional Shift Coordinator */}
                    <div>
                        <label>Name of Regional Shift Coordinator</label>
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

                    {/* Phone of Regional Shift Coordinator */}
                    <div>
                        <label>Phone of Regional Shift Coordinator</label>
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

                    {/* Name of Assistant Regional Shift Coordinator (optional) */}
                    <div>
                        <label>
                            Name of Assistant Regional Shift Coordinator
                            (Optional)
                        </label>
                        <input
                            type="text"
                            value={assistantShiftCoordinator}
                            onChange={(e) =>
                                setAssistantShiftCoordinator(e.target.value)
                            }
                            placeholder="Enter Name"
                        />
                    </div>

                    {/* Phone of Assistant Regional Shift Coordinator (optional) */}
                    <div>
                        <label>
                            Phone of Assistant Regional Shift Coordinator
                            (Optional)
                        </label>
                        <input
                            type="tel"
                            value={assistantShiftCoordinatorPhone}
                            onChange={(e) =>
                                setAssistantShiftCoordinatorPhone(
                                    e.target.value
                                )
                            }
                            placeholder="Enter Phone Number"
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

export default PastorsForm;
