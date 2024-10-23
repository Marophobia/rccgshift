'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IregionalPastors } from '@/app/types/regionalPastor';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import { regions, nigerianStates } from '@/app/forms/components/index';
import React from 'react';

type Props = {
    pastor: IregionalPastors;
};

const EditEntry = ({ pastor }: Props) => {
    const [region, setRegion] = useState(pastor.region);
    const [state, setState] = useState(pastor.state);
    const [name, setName] = useState(pastor.name);
    const [phone, setPhone] = useState(pastor.phone);
    const [shiftCoordinator, setShiftCoordinator] = useState(
        pastor.regional_shift_coordinator_name
    );
    const [shiftCoordinatorPhone, setShiftCoordinatorPhone] = useState(
        pastor.regional_shift_coordinator_phone
    );
    const [assistantShiftCoordinator, setAssistantShiftCoordinator] = useState(
        pastor.assistant_regional_shift_coordinator_name
    );
    const [assistantShiftCoordinatorPhone, setAssistantShiftCoordinatorPhone] =
        useState(pastor.assistant_regional_shift_coordinator_phone);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            id: pastor.id,
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
            const update = await fetch(
                `${apiUrl}/api/admin/pastors/actions/edit`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            console.log(update);

            if (update.ok) {
                toast.success('Action Completed successfully');
                router.refresh();
            } else {
                toast.error(`${update.statusText}: Update operation failed`);
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PencilIcon size={20} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Entry</DialogTitle>
                        <DialogDescription>
                            Make changes to this entry. Click save when
                            you&amp;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            {/* Select Region */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="region" className="text-right">
                                    Region
                                </Label>
                                <Select
                                    onValueChange={(value) => setRegion(value)}
                                    defaultValue={pastor.region}
                                    // className="col-span-3"
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
                                                Region {region}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Select State */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="state" className="text-right">
                                    State
                                </Label>
                                <Select
                                    onValueChange={(value) => setState(value)}
                                    defaultValue={pastor.state}
                                    // className="col-span-3"
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

                            {/* Name of Regional Youth Pastor */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Name"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Phone of Regional Youth Pastor */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter Phone Number"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Name of Regional Shift Coordinator */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="shiftCoordinator"
                                    className="text-right"
                                >
                                    Shift Coordinator
                                </Label>
                                <Input
                                    type="text"
                                    id="shiftCoordinator"
                                    value={shiftCoordinator}
                                    onChange={(e) =>
                                        setShiftCoordinator(e.target.value)
                                    }
                                    placeholder="Enter Name"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Phone of Regional Shift Coordinator */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="shiftCoordinatorPhone"
                                    className="text-right"
                                >
                                    Phone
                                </Label>
                                <Input
                                    type="tel"
                                    id="shiftCoordinatorPhone"
                                    value={shiftCoordinatorPhone}
                                    onChange={(e) =>
                                        setShiftCoordinatorPhone(e.target.value)
                                    }
                                    placeholder="Enter Phone Number"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Optional Assistant Shift Coordinator */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="assistantShiftCoordinator"
                                    className="text-right"
                                >
                                    Assistant Shift Coordinator (Optional)
                                </Label>
                                <Input
                                    type="text"
                                    id="assistantShiftCoordinator"
                                    value={
                                        assistantShiftCoordinator
                                            ? assistantShiftCoordinator
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setAssistantShiftCoordinator(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter Name"
                                    className="col-span-3"
                                />
                            </div>

                            {/* Optional Phone of Assistant Shift Coordinator */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="assistantShiftCoordinatorPhone"
                                    className="text-right"
                                >
                                    Phone (Optional)
                                </Label>
                                <Input
                                    type="tel"
                                    id="assistantShiftCoordinatorPhone"
                                    value={
                                        assistantShiftCoordinatorPhone
                                            ? assistantShiftCoordinatorPhone
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setAssistantShiftCoordinatorPhone(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter Phone Number"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button type="submit" variant={'default'}>
                                    Save changes
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditEntry;
