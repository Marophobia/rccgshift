'use client';
import { IuserSession } from '@/app/types/user_session';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';

type Props = {
    rounds: {
        id: number;
        name: string;
        status: boolean;
        users: IuserSession[];
    }[];
    settings: {
        id: number;
        current_round: number;
        status: boolean;
    };
};

const RoundsCard = (props: Props) => {
    const { rounds, settings } = props;
    const [qualifiers, setQualifiers] = useState(0);
    const router = useRouter();

    const handleChange = (e: any) => {
        let value = e.target.value;
        setQualifiers(value);
    };

    const continuer = async () => {
        if (!qualifiers) return toast.error('Please input a valid number');
        const current_round = settings.current_round;
        const contestants = rounds[current_round - 1].users.length;
        if (qualifiers >= contestants)
            return toast.error(
                'Qualifiers cannot be equal to or greater than the contestants'
            );

        try {
            const update = await fetch(`${apiUrl}/api/admin/rounds/new`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ qualifiers }),
            });

            if (update.ok) {
                toast.success('New Round Set');
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
            <AlertDialog>
                <AlertDialogTrigger>
                    <div className="mb-4 w-full d-flex justify-center">
                        <div className="gap-1 btn b-solid btn-primary-solid my-3">
                            Start New Round
                        </div>
                    </div>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div>
                                <label className="form-label">
                                    Input number of Qualifiers
                                </label>
                                <input
                                    type="number"
                                    value={qualifiers}
                                    onChange={handleChange}
                                    className="form-input"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <p className="text-red-600">
                                Please Note that this action cannot be undone
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

            <div className="grid 2xl:grid-cols-12 md:grid-cols-9">
                {rounds.map((round, index) => (
                    <div className="col-span-3 mr-2" key={round.id}>
                        <div className="card">
                            <div className="card-body ">
                                <div className="flex justify-between">
                                    <h2>Round {index + 1}</h2>
                                    {round.id === settings.current_round ? (
                                        <p>
                                            <span className="text-green-600">
                                                Current Round
                                            </span>
                                        </p>
                                    ) : round.users.length > 0 ? (
                                        <p>
                                            <span className="text-red-600">
                                                Finished
                                            </span>
                                        </p>
                                    ) : (
                                        <p>
                                            <span className="text-yellow-600">
                                                Upcoming
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <div className="py-10">
                                    <h1
                                        className="text-center"
                                        style={{ fontWeight: '700' }}
                                    >
                                        {round.name}
                                    </h1>
                                </div>
                                <div className="flex gap-2 justify-center">
                                    <div className="btn b-outline btn-primary-outline">
                                        Participants: {round.users.length}
                                    </div>
                                    <div className="btn b-outline btn-info-outline">
                                        Qualifiers:{' '}
                                        {index + 1 < rounds.length
                                            ? rounds[index + 1].users.length
                                            : round.users.length}
                                    </div>
                                </div>
                                <div className="w-full flex justify-center">
                                    <Link
                                        href={`/admin/rounds/${round.id}`}
                                        className="btn b-solid btn-primary-solid mt-3 w-full"
                                    >
                                        More Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RoundsCard;
