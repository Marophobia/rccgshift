'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {};

const JudgeForm = (props: Props) => {
    // State to capture form inputs
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [judge, setjudge] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic validation
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        // Process form submission (e.g., send data to backend)
        const formData = {
            judge,
            oldPassword,
            newPassword,
            confirmPassword,
        };

        try {
            const update = await fetch(
                `${apiUrl}/api/admin/settings/password/judge`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (update.ok) {
                toast.success('Password Changed');
                router.refresh();
            } else {
                const error = await update.json();
                toast.error('Something went wrong: ' + error.error);
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <>
            <div className="card p-5">
                <h2 className="mb-5">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Select Judge</label>

                        {/* 
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        /> */}

                        <Select
                            onValueChange={(value) => setjudge(value)}
                            value={judge}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a judge to change password" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="judge1">Judge1</SelectItem>
                                <SelectItem value="judge2">Judge2</SelectItem>
                                <SelectItem value="judge3">Judge3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn b-solid btn-primary-solid mt-5"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default JudgeForm;
