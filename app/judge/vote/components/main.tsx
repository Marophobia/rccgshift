"use client"
import { useState, useEffect } from 'react';
import { IuserSession } from '@/app/types/user_session';
import { MoveRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2';
import { UserSessionStatus } from '@prisma/client';

type Props = {
    data: {
        id: number;
        name: string;
        status: boolean;
        qualifiers: number;
        users: IuserSession[];
    };
};

const Main = (props: Props) => {
    const { data } = props;
    const router = useRouter()

    const [currentContestantIndex, setCurrentContestantIndex] = useState(0); // Initial state

    // Function to find the index of the first contestant with a specific status
    const findContestantIndex = (status: string) => {
        return data.users.findIndex((contestant) => contestant.status === status);
    };

    // useEffect to run on component mount or when data changes
    useEffect(() => {
        const index = findContestantIndex('pending');
        if (index === -1) {
            const skippedIndex = findContestantIndex('skipped');
            if (skippedIndex === -1) {
                // Trigger the Swal alert if all contestants are voted
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You!',
                    text: 'Voting for all contestants is completed! Thank you for voting!',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Proceed',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.replace('/judge');
                    }
                });
            } else {
                setCurrentContestantIndex(skippedIndex);
            }
        } else {
            setCurrentContestantIndex(index);  // Set the index to the first pending contestant
        }
    }, [data]);  // Re-run if data changes

    // Rest of your component logic (e.g., rendering the current contestant)
    const contestant = data.users[currentContestantIndex];


    // State to track selected option (yes, no, maybe)
    const [selectedOption, setSelectedOption] = useState<null | 20 | 10 | 0>(null);

    // Handle button click for Yes, No, Maybe
    const handleOptionClick = (option: 20 | 10 | 0) => {
        setSelectedOption(option);
    };


    // Move to next contestant
    const handleNext = async (id: number) => {

        toast.loading('Please Wait')

        try {
            const update = await fetch(`${apiUrl}/api/judges/vote`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vote: selectedOption, id })
            });
            if (update.ok) {
                // router.prefetch('/judge/vote')
                toast.dismiss()
                setSelectedOption(null)

                router.refresh()
                // router.refresh()
                // setCurrentContestantIndex(getStartingIndex())
            } else if (update.status === 400) {
                toast.dismiss();
                toast.error('You have already voted for this contestant');
            } else {
                toast.dismiss();
                toast.error('Something went wrong');
            }

        } catch (error: any) {
            console.error('Error:', error);
            toast.dismiss()
            toast.error('An error occurred');
        }
    };

    const skip = async (id: number) => {
        toast.loading('Please Wait')

        try {
            const update = await fetch(`${apiUrl}/api/judges/skip`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (update.ok) {
                // router.prefetch('/judge/vote')
                toast.dismiss()
                setSelectedOption(null)
                router.refresh()
                // setCurrentContestantIndex(getStartingIndex())
            } else if (update.status === 400) {
                toast.dismiss();
                toast.error('You have already voted for this contestant');
            } else if (update.status === 405) {
                toast.dismiss();
                toast.error('You are not allowed to skip');
            } else {
                toast.dismiss();
                toast.error('Something went wrong');
            }

        } catch (error: any) {
            console.error('Error:', error);
            toast.dismiss()
            toast.error('An error occurred');
        }

    }



    return (
        <>
            <ToastContainer />
            <div className='flex bg-body-light w-full dark:bg-dark-body'>
                <div
                    id="app-menu-drawer"
                    className="app-menu h-[100dvh] flex flex-col gap-y-2.5 bg-white dark:bg-dark-card w-app-menu fixed top-0 left-0 bottom-0 -translate-x-full group-data-[sidebar-size=sm]:min-h-screen group-data-[sidebar-size=sm]:h-max xl:translate-x-0 rounded-r-10 xl:rounded-15 xl:group-data-[sidebar-size=lg]:w-app-menu xl:group-data-[sidebar-size=sm]:w-app-menu-sm xl:group-data-[sidebar-size=sm]:absolute xl:group-data-[sidebar-size=lg]:fixed xl:top-4 xl:left-4 xl:group-data-[sidebar-size=lg]:bottom-4 z-backdrop ac-transition"
                >
                    <div
                        id="app-menu-scrollbar"
                        data-scrollbar
                        className="pl-4 group-data-[sidebar-size=sm]:pl-0 text-center group-data-[sidebar-size=sm]:!overflow-visible !overflow-x-hidden smooth-scrollbar"
                    >
                        <div className='mt-8'>
                            <h1 style={{ fontWeight: "500", fontSize: "25px" }}>Skipped Contestants</h1>
                        </div>

                        {data.users.map((contestant, index) => (
                            contestant.status === 'skipped' && (
                                <div key={contestant.id}>
                                    <button onClick={() => setCurrentContestantIndex(index)}>
                                        <div className='flex gap-2 mt-5'>
                                            <img
                                                src={`/images/contestants/${contestant.user.picture}`}
                                                width="100"
                                                style={{ border: '2px solid red' }}
                                            />
                                            <div style={{ textAlign: 'left' }}>
                                                <p>Contestant {contestant.user.id}</p>
                                                <p>{contestant.user.name}</p>
                                                <p>{contestant.user.category}</p>
                                                <p>{contestant.user.type}</p>
                                            </div>
                                        </div>
                                    </button>
                                    <hr className="my-5 mx-5" />
                                </div>
                            )
                        ))}

                        <div>

                        </div>

                        <div className="mt-auto px-7 py-6 fixed -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                            <a href="#"
                                className="flex-center-between text-gray-500 dark:text-dark-text font-semibold leading-none bg-gray-200 dark:bg-[#090927] dark:group-data-[sidebar-size=sm]:bg-dark-card-shade rounded-[10px] px-6 py-4 group-data-[sidebar-size=sm]:p-[12px_8px] group-data-[sidebar-size=sm]:justify-center">
                                <span className="group-data-[sidebar-size=sm]:hidden block">Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M6.66645 15.3328C6.66645 15.5096 6.59621 15.6792 6.47119 15.8042C6.34617 15.9292 6.17661 15.9995 5.9998 15.9995H1.33329C0.979679 15.9995 0.640552 15.859 0.390511 15.609C0.140471 15.3589 0 15.0198 0 14.6662V1.33329C0 0.979679 0.140471 0.640552 0.390511 0.390511C0.640552 0.140471 0.979679 0 1.33329 0H5.9998C6.17661 0 6.34617 0.0702357 6.47119 0.195256C6.59621 0.320276 6.66645 0.48984 6.66645 0.666645C6.66645 0.84345 6.59621 1.01301 6.47119 1.13803C6.34617 1.26305 6.17661 1.33329 5.9998 1.33329H1.33329V14.6662H5.9998C6.17661 14.6662 6.34617 14.7364 6.47119 14.8614C6.59621 14.9865 6.66645 15.156 6.66645 15.3328ZM15.8045 8.47139L12.4713 11.8046C12.378 11.898 12.2592 11.9615 12.1298 11.9873C12.0004 12.0131 11.8663 11.9999 11.7444 11.9494C11.6225 11.8989 11.5184 11.8133 11.4451 11.7036C11.3719 11.5939 11.3329 11.4649 11.333 11.333V8.66638H5.9998C5.823 8.66638 5.65343 8.59615 5.52841 8.47113C5.40339 8.34611 5.33316 8.17654 5.33316 7.99974C5.33316 7.82293 5.40339 7.65337 5.52841 7.52835C5.65343 7.40333 5.823 7.33309 5.9998 7.33309H11.333V4.66651C11.3329 4.53459 11.3719 4.4056 11.4451 4.29587C11.5184 4.18615 11.6225 4.10062 11.7444 4.05012C11.8663 3.99962 12.0004 3.98642 12.1298 4.01218C12.2592 4.03795 12.378 4.10152 12.4713 4.19486L15.8045 7.52809C15.8665 7.59 15.9156 7.66352 15.9492 7.74445C15.9827 7.82538 16 7.91213 16 7.99974C16 8.08735 15.9827 8.17409 15.9492 8.25502C15.9156 8.33595 15.8665 8.40948 15.8045 8.47139ZM14.3879 7.99974L12.6663 6.27563V9.72385L14.3879 7.99974Z"
                                        fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-full xl:pl-[300px] '>
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="col-span-full 2xl:col-span-12 card p-0">
                                <div className="px-5 sm:px-12 py-11 relative overflow-hidden h-full">
                                    <div className="main">
                                        <div className="flex justify-between mb-10">
                                            <img src="/images/logo.png" width="250" />
                                            <p style={{ fontWeight: '500', fontSize: '40px' }}>{data.name}</p>
                                        </div>

                                        <>
                                            <div className="grid lg:grid-cols-12" key={contestant.user.id}>
                                                <div className="col-span-4">
                                                    <div className="p-5">
                                                        <div>
                                                            <img
                                                                src={`/images/contestants/${contestant.user.picture}`}
                                                                width="200"
                                                                className="w-fit"
                                                                style={{ border: '2px solid red' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-8">
                                                    <div className="p-5">
                                                        <h1 className="mb-3">Contestant {contestant.user.id}</h1>
                                                        <div>
                                                            <p>Name: {contestant.user.name}</p>
                                                            <hr style={{ border: '1px solid black' }} className="my-5" />
                                                            <p>Category: {contestant.user.category}</p>
                                                            <hr style={{ border: '1px solid black' }} className="my-5" />
                                                            <p>Type: {contestant.user.type}</p>
                                                            <hr style={{ border: '1px solid black' }} className="my-5" />
                                                            <p>Bio: {contestant.user.bio}</p>
                                                        </div>
                                                    </div>

                                                    {/* Yes, No, Maybe buttons */}
                                                    <div className="flex mt-20 gap-10 justify-center">
                                                        <button
                                                            className={`btn b-solid btn-secondary-solid ${selectedOption === 20 ? 'opacity-10' : ''}`}
                                                            style={{ width: '25%' }}
                                                            onClick={() => handleOptionClick(20)}
                                                            disabled={selectedOption === 20}
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            className={`btn b-solid btn-warning-solid ${selectedOption === 10 ? 'opacity-10' : ''}`}
                                                            style={{ width: '25%' }}
                                                            onClick={() => handleOptionClick(10)}
                                                            disabled={selectedOption === 10}
                                                        >
                                                            Maybe
                                                        </button>
                                                        <button
                                                            className={`btn b-solid btn-danger-solid ${selectedOption === 0 ? 'opacity-10' : ''}`}
                                                            style={{ width: '25%' }}
                                                            onClick={() => handleOptionClick(0)}
                                                            disabled={selectedOption === 0}
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Next button */}
                                            <div className="flex mt-5 gap-10 justify-center">
                                                <button
                                                    className={`btn b-solid btn-primary-solid btn-lg mt-6 w-full ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => handleNext(contestant.id)}
                                                    disabled={selectedOption === null}
                                                >
                                                    Next <MoveRight />
                                                </button>
                                            </div>
                                            {/* skip button */}
                                            <div className="flex gap-10 justify-center">
                                                <button
                                                    className={`btn b-solid btn-danger-solid btn-lg mt-6 w-full`}
                                                    onClick={() => skip(contestant.id)}
                                                >
                                                    Skip <MoveRight />
                                                </button>
                                            </div>
                                        </>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
