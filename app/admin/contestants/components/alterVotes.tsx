'use client';
import React, { useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import { Icontestants } from '@/app/types/contestants';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';

type Props = {
    contestant: Icontestants;
};

const AlterVotes = ({ contestant }: Props) => {
    const [votes, setVotes] = useState(0);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVotes(parseInt(e.target.value));
    };
    const continuer = async () => {
        const data = {
            vote: votes,
            id: contestant.id,
        };

        try {
            const update = await fetch(
                `${apiUrl}/api/admin/settings/alterVotes`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            );

            if (update.ok) {
                toast.success('votes updated');
                router.refresh();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <>
            <div>
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <div className="mb-4 w-full d-flex justify-center">
                                <div className="gap-1 btn b-solid btn-primary-solid my-3">
                                    Alter votes
                                </div>
                            </div>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Input actual of vote count
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    <label className="form-label">
                                        Input actual of vote count
                                    </label>
                                    <input
                                        type="number"
                                        value={votes}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        autoComplete="off"
                                        required
                                    />
                                    <p className="text-red-600">
                                        Please Note that this action cannot be
                                        undone
                                    </p>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={continuer}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    );
};

export default AlterVotes;
