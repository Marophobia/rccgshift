'use client';
import React, { useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Props = {
    status?: boolean;
};

const VoteSettings = (props: Props) => {
    const { status } = props;

    const [isSkipped, setIsSkipped] = useState(status);
    const router = useRouter();

    const handleToggle = async () => {
        const newSkipValue = !isSkipped;
        setIsSkipped(newSkipValue);

        // Call the API route to update the status
        try {
            const response = await fetch(`${apiUrl}/api/admin/settings/skip`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isSkipped: newSkipValue }),
            });

            if (!response.ok) {
                console.error('Failed to update skip status');
            }
            toast.success('Setting Changed');
            router.refresh();
        } catch (error) {
            console.error(
                'An error occurred while updating skip status:',
                error
            );
            toast.error('An error occurred');
        }
    };
    return (
        <>
            <div className="card p-5 flex items-center space-x-2">
                <Switch
                    id="skip"
                    checked={isSkipped}
                    onCheckedChange={handleToggle}
                />
                <Label htmlFor="skip">Enable Skip</Label>
            </div>
        </>
    );
};

export default VoteSettings;
