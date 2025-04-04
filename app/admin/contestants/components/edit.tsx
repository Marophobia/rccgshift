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
import { regions } from '@/app/forms/components';
import { regionProvinces } from '@/app/forms/components';
import React from 'react';
import { Icontestants } from '@/app/types/contestants';

type Props = {
    contestant: Icontestants
};

const EditContestants = ({ contestant }: Props) => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const update = await fetch(
                `${apiUrl}/api/admin/contestants/edit`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

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

    const [formData, setFormData] = useState({
        id: contestant.id,
        profilePicture: null as string | null,
        name: contestant.name,
        email: contestant.email,
        telephone: contestant.telephone,
        gender: contestant.gender,
        ageGrade: contestant.age_grade,
        country: contestant.country,
        state: contestant.state,
        region: contestant.region,
        province: contestant.province,
        category: contestant.category,
        creativity: contestant.creativity,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PencilIcon size={15} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Contestant (Basic)</DialogTitle>
                        <DialogDescription>
                            Make changes to this entry. Click save when
                            you&amp;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">


                            {/* Name of Regional Youth Pastor */}
                            <div className="">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="">
                                <Label htmlFor="telephone" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    type="tel"
                                    id="telephone"
                                    name='telephone'
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    className="col-span-3"
                                    required
                                />
                            </div>

                            {/* Gender */}
                            <div className="">
                                <Label htmlFor="gender" className="text-right">
                                    Gender
                                </Label>
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


                            {/* Select Region */}
                            <div className="">
                                <Label htmlFor="region" className="text-right">
                                    Region
                                </Label>
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
                                        <SelectValue placeholder="Select Region" className='w-full' />
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
                                    <div className="items-center">
                                        <Label htmlFor="province" className="text-right">
                                            Province
                                        </Label>
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

export default EditContestants;
