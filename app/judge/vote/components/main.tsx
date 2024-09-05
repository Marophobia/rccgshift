"use client"
import { useState } from 'react';
import { IuserSession } from '@/app/types/user_session';
import { MoveRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from "next/navigation"


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

    // State to track the current contestant index
    const [currentContestantIndex, setCurrentContestantIndex] = useState(0);

    // State to track selected option (yes, no, maybe)
    const [selectedOption, setSelectedOption] = useState<null | 20 | 10 | 0>(null);

    // Handle button click for Yes, No, Maybe
    const handleOptionClick = (option: 20 | 10 | 0) => {
        setSelectedOption(option);
    };

    // Move to next contestant
    const handleNext = async (id: number) => {

        toast.loading('Please Wait')
        console.log(selectedOption)

        try {
            const update = await fetch(`${apiUrl}/api/judges/vote`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vote: selectedOption, id })
            });
            if (update.ok) {
                toast.dismiss()
                toast.success('Vote recorded');
                if (currentContestantIndex < data.users.length - 1) {
                    setSelectedOption(null); // Reset the selection
                    setCurrentContestantIndex((prevIndex) => prevIndex + 1);
                } else {
                    toast.dismiss()
                    toast.error('No more contestants');
                    router.push('/judge/end')
                }
            } else {
                toast.dismiss()
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.dismiss()
            toast.error('An error occurred');
        }

    };

    const contestant = data.users[currentContestantIndex]; // Get current contestant

    return (
        <>
            <ToastContainer />
            <div className="col-span-full 2xl:col-span-12 card p-0">
                <div className="px-5 sm:px-12 py-11 relative overflow-hidden h-full">
                    <div className="main">
                        <div className="flex justify-between mb-10">
                            <img src="/images/logo.png" width="250" />
                            <p style={{ fontWeight: '500', fontSize: '40px' }}>{data.name}</p>
                        </div>

                        <div className="grid lg:grid-cols-12" key={contestant.user.id}>
                            <div className="col-span-4">
                                <div className="p-5">
                                    <div>
                                        <img
                                            src="/images/cont1.jpg"
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
                                onClick={() => handleNext(contestant.user.id)}
                                disabled={selectedOption === null}
                            >
                                Next <MoveRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
