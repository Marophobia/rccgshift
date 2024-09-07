'use client';
import { useState, useEffect } from 'react';
import { IuserSession } from '@/app/types/user_session';
import { MenuIcon, MoveRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { UserSessionStatus } from '@prisma/client';
import SignOut from '@/app/admin/components/SignOut';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
    const router = useRouter();

    const [currentContestantIndex, setCurrentContestantIndex] = useState(0); // Initial state

    // Function to find the index of the first contestant with a specific status
    const findContestantIndex = (status: string) => {
        return data.users.findIndex(
            (contestant) => contestant.status === status
        );
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
            setCurrentContestantIndex(index); // Set the index to the first pending contestant
        }
    }, [data]); // Re-run if data changes

    // Rest of your component logic (e.g., rendering the current contestant)
    const contestant = data.users[currentContestantIndex];

    // State to track selected option (yes, no, maybe)
    const [selectedOption, setSelectedOption] = useState<null | 20 | 10 | 0>(
        null
    );

    // Handle button click for Yes, No, Maybe
    const handleOptionClick = (option: 20 | 10 | 0) => {
        setSelectedOption(option);
    };

    // Move to next contestant
    const handleNext = async (id: number) => {
        toast.loading('Please Wait');

        try {
            const update = await fetch(`${apiUrl}/api/judges/vote`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vote: selectedOption, id }),
            });
            if (update.ok) {
                // router.prefetch('/judge/vote')
                toast.dismiss();
                setSelectedOption(null);

                router.refresh();
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
            toast.dismiss();
            toast.error('An error occurred');
        }
    };

    const skip = async (id: number) => {
        toast.loading('Please Wait');

        try {
            const update = await fetch(`${apiUrl}/api/judges/skip`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (update.ok) {
                // router.prefetch('/judge/vote')
                toast.dismiss();
                setSelectedOption(null);
                router.refresh();
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
            toast.dismiss();
            toast.error('An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex bg-body-light w-full dark:bg-dark-body">
                {/* sidebar */}
                <div
                    id="app-menu-drawer"
                    className="app-menu h-[100dvh] flex flex-col gap-y-2.5 bg-white dark:bg-dark-card w-app-menu fixed top-0 left-0 bottom-0 -translate-x-full group-data-[sidebar-size=sm]:min-h-screen group-data-[sidebar-size=sm]:h-max xl:translate-x-0 rounded-r-10 xl:rounded-15 xl:group-data-[sidebar-size=lg]:w-app-menu xl:group-data-[sidebar-size=sm]:w-app-menu-sm xl:group-data-[sidebar-size=sm]:absolute xl:group-data-[sidebar-size=lg]:fixed xl:top-4 xl:left-4 xl:group-data-[sidebar-size=lg]:bottom-4 z-backdrop ac-transition"
                >
                    <div
                        id="app-menu-scrollbar"
                        data-scrollbar
                        className="pl-4 group-data-[sidebar-size=sm]:pl-0 text-center group-data-[sidebar-size=sm]:!overflow-visible !overflow-x-hidden smooth-scrollbar"
                    >
                        <div className="mt-8">
                            <h1 style={{ fontWeight: '500', fontSize: '25px' }}>
                                Skipped Contestants
                            </h1>
                        </div>

                        {data.users.map(
                            (contestant, index) =>
                                contestant.status === 'skipped' && (
                                    <div key={contestant.id}>
                                        <button
                                            onClick={() =>
                                                setCurrentContestantIndex(index)
                                            }
                                        >
                                            <div className="flex gap-2 mt-5">
                                                <Image
                                                    height={200}
                                                    width={200}
                                                    alt="contestant profile picture"
                                                    src={`/images/contestants/${contestant.user.picture}`}
                                                    className="w-[60px] h-fit border-2 border-red-500"
                                                />
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <p>
                                                        Contestant{' '}
                                                        {contestant.user.id}
                                                    </p>
                                                    <p className="font-bold">
                                                        {contestant.user.name}
                                                    </p>
                                                    <p>
                                                        {
                                                            contestant.user
                                                                .category
                                                        }
                                                    </p>
                                                    <p>
                                                        {contestant.user.type}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                        <hr className="my-5 mx-5" />
                                    </div>
                                )
                        )}

                        <div></div>

                        <div className="mt-auto px-7 py-6 fixed -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                            <div className="mt-auto px-7 py-6 fixed -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                                <SignOut />
                            </div>
                        </div>
                    </div>
                </div>
                {/* side bar end */}

                {/* main content */}
                <div className="w-full xl:pl-[300px] ">
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="flex justify-between items-center card col-span-full">
                                <Link href="/judge">
                                    <Image
                                        height={150}
                                        alt="logo"
                                        src="/images/logo.png"
                                        width={150}
                                    />
                                </Link>
                                <p className="font-bold text-2xl">
                                    {data.name}
                                </p>
                            </div>
                            <div className="card col-span-full flex-center flex items-center justify-center xl:hidden">
                                <Sheet>
                                    <SheetTrigger>
                                        <button className="flex items-center justify-center">
                                            Contestants <MenuIcon />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side={'left'}>
                                        <div>
                                            <ScrollArea>
                                                <div className="mt-8">
                                                    <h1
                                                        style={{
                                                            fontWeight: '500',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        Skipped Contestants
                                                    </h1>
                                                </div>

                                                {data.users.map(
                                                    (contestant, index) =>
                                                        contestant.status ===
                                                            'skipped' && (
                                                            <div
                                                                key={
                                                                    contestant.id
                                                                }
                                                            >
                                                                <button
                                                                    onClick={() =>
                                                                        setCurrentContestantIndex(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <div className="flex gap-2 mt-5">
                                                                        <Image
                                                                            height={
                                                                                200
                                                                            }
                                                                            width={
                                                                                200
                                                                            }
                                                                            alt="contestant profile picture"
                                                                            src={`/images/contestants/${contestant.user.picture}`}
                                                                            className="w-[60px] h-fit border-2 border-red-500"
                                                                        />
                                                                        <div
                                                                            style={{
                                                                                textAlign:
                                                                                    'left',
                                                                            }}
                                                                        >
                                                                            <p>
                                                                                Contestant{' '}
                                                                                {
                                                                                    contestant
                                                                                        .user
                                                                                        .id
                                                                                }
                                                                            </p>
                                                                            <p className="font-bold">
                                                                                {
                                                                                    contestant
                                                                                        .user
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                {
                                                                                    contestant
                                                                                        .user
                                                                                        .category
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                {
                                                                                    contestant
                                                                                        .user
                                                                                        .type
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                <hr className="my-5 mx-5" />
                                                            </div>
                                                        )
                                                )}
                                            </ScrollArea>

                                            <div></div>

                                            <div className="mt-auto px-7 py-6 fixed -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                                                <div className="mt-auto px-7 py-6 fixed -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                                                    <SignOut />
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className="col-span-full 2xl:col-span-12 card p-0">
                                <div className="px-5 sm:px-12 pb-11 relative overflow-hidden h-full">
                                    <div className="main">
                                        <>
                                            <div
                                                className="grid lg:grid-cols-12"
                                                key={contestant.user.id}
                                            >
                                                <div className="col-span-3">
                                                    <div className="p-5">
                                                        <div>
                                                            <Image
                                                                src={`/images/contestants/${contestant.user.picture}`}
                                                                width={200}
                                                                height={200}
                                                                alt="contestant profile picture"
                                                                className="h-1/4 max-lg:w-full border-2 border-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-9">
                                                    <div className="p-5">
                                                        <h1 className="mb-3">
                                                            Contestant{' '}
                                                            {contestant.user.id}
                                                        </h1>
                                                        <ScrollArea className="h-[300px] rounded-md border p-4">
                                                            <div className="grid gap-3">
                                                                {/* name */}
                                                                <p>
                                                                    Name:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* category */}
                                                                <p>
                                                                    Category:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .category
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* type */}
                                                                <p>
                                                                    Type:{' '}
                                                                    {contestant
                                                                        .user
                                                                        .type ===
                                                                    'Group' ? (
                                                                        <span className="font-bold">
                                                                            {
                                                                                contestant
                                                                                    .user
                                                                                    .type
                                                                            }{' '}
                                                                            {
                                                                                contestant
                                                                                    .user
                                                                                    .number_of_members
                                                                            }
                                                                        </span>
                                                                    ) : (
                                                                        <span className="font-bold">
                                                                            Solo
                                                                        </span>
                                                                    )}
                                                                </p>
                                                                <Separator />
                                                                {/* bio */}
                                                                <p>
                                                                    Bio:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .bio
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* age */}
                                                                <p>
                                                                    Age:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .age_grade
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* region */}
                                                                <p>
                                                                    Region:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .region
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* country / state */}
                                                                <p>
                                                                    Country:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .state
                                                                        }
                                                                        ,{' '}
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .country
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <Separator />
                                                                {/* pastor */}
                                                                <p>
                                                                    Regional
                                                                    Pastor:{' '}
                                                                    <span className="font-bold">
                                                                        {
                                                                            contestant
                                                                                .user
                                                                                .regional_pastor
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </ScrollArea>
                                                    </div>
                                                </div>
                                                {/* Yes, No, Maybe buttons */}
                                                <div className="col-span-full card flex justify-center gap-3">
                                                    <button
                                                        className={`rounded-full p-5 btn text-center bg-green-600 ${
                                                            selectedOption ===
                                                            20
                                                                ? 'opacity-10'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                        onClick={() =>
                                                            handleOptionClick(
                                                                20
                                                            )
                                                        }
                                                        disabled={
                                                            selectedOption ===
                                                            20
                                                        }
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        className={`rounded-full p-5 btn text-center bg-yellow-500 ${
                                                            selectedOption ===
                                                            10
                                                                ? 'opacity-10'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                        onClick={() =>
                                                            handleOptionClick(
                                                                10
                                                            )
                                                        }
                                                        disabled={
                                                            selectedOption ===
                                                            10
                                                        }
                                                    >
                                                        Maybe
                                                    </button>
                                                    <button
                                                        className={`rounded-full p-5 btn text-center bg-red-500 ${
                                                            selectedOption === 0
                                                                ? 'opacity-10'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                        onClick={() =>
                                                            handleOptionClick(0)
                                                        }
                                                        disabled={
                                                            selectedOption === 0
                                                        }
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Next button */}
                                            <div className="flex mt-5 gap-10 justify-center">
                                                <button
                                                    className={`btn b-solid btn-primary-solid btn-lg mt-6 w-full ${
                                                        selectedOption === null
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        handleNext(
                                                            contestant.id
                                                        )
                                                    }
                                                    disabled={
                                                        selectedOption === null
                                                    }
                                                >
                                                    Next <MoveRight />
                                                </button>
                                            </div>
                                            {/* skip button */}
                                            <div className="flex gap-10 justify-center">
                                                <button
                                                    className={`btn b-solid btn-danger-solid btn-lg mt-6 w-full`}
                                                    onClick={() =>
                                                        skip(contestant.id)
                                                    }
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
