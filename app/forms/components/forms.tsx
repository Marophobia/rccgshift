// Regional pastors form

// 1. Select Region (Region 1-Region 59)
// 2. State of Region
// 2. Name of Regional Youth Pastor
// 3. Phone of Regional Youth Pastor

// 4. Name of Regional Shift Coordinator
// 5. Phone of Regional Shift Coordinator

// 6. Name of Assistant Regional Shift Coordinator (optional)
// 7. Phone of Assistant Regional Shift Coordinator (optional)
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

type Props = {};

const PastorsForm = (props: Props) => {
    const [region, setRegion] = useState('');
    const [state, setState] = useState('');
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
        e.preventDefault();
        const formData = {
            region,
            state,
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
                toast.success('Regional pastor Added successfully');
                router.refresh();
            } else if (update.status === 409) {
                toast.error(
                    `${update.statusText}: Pastor already exists for this region`
                );
            }
        } catch (error: any) {
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
                            </SelectContent>
                        </Select>
                    </div>

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
