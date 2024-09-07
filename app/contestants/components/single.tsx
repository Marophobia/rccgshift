"use client"
import React from 'react'
enum UserStatus {
    Registered = 'registered',
    Approved = 'approved',
    Disqualified = 'disqualified'
}

import { IuserSession } from '../../types/user_session'
import { Iround } from '../../types/round'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { useState } from 'react'
import { PaystackButton } from 'react-paystack'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
    contestant: {
        id: number,
        name: string,
        email: string,
        telephone: string,
        bio: string,
        regional_pastor: string,
        gender: string,
        age_grade: string,
        category: string,
        type: string,
        number_of_members: number,
        country: string,
        state: string,
        region: string,
        province: string,
        picture: string,
        status: UserStatus,
        date: Date
        user_sessions: IuserSession[]
    },
    settings: {
        id: number,
        current_round: number,
        status: boolean,
        round: Iround
    }
}

const Single = (props: Props) => {
    const { contestant, settings } = props
    const [votes, setVotes] = useState(1);
    const voteCost = 100; // Cost per vote
    const [swalShown, setSwalShown] = useState(false)
    const router = useRouter()

    // Handler for input change
    const handleInputChange = (event: any) => {
        const newVotes = parseInt(event.target.value, 10);
        if (!isNaN(newVotes)) {
            setVotes(newVotes);
            console.log(votes)
        } else {
            setVotes(0); // Reset votes if input is not a valid number
        }
    };

    // Calculate the total amount
    const totalAmount = votes * voteCost;
    const publicKey = 'pk_test_af7feb1b416ddf7843b1416bee73435f16eec86e'

    const data = {
        id: contestant.id,
        vote: votes

    }

    const componentProps = {
        email: contestant.email,
        amount: totalAmount * 100,
        fname: contestant.name,
        lname: contestant.name,
        publicKey: publicKey,
        text: "Pay with Card",
        onSuccess: () => {
            fetch(`${apiUrl}/api/vote`, {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(responseData => {
                    if (responseData.message === "Vote Successful") {
                        Swal.fire({
                            didOpen: () => setSwalShown(true),
                            didClose: () => setSwalShown(false),
                            icon: 'success',
                            title: 'Vote Completed',
                            text: `Vote placed for ${contestant.name}`,
                            confirmButtonColor: '#F5245F'
                        });
                        router.refresh()
                    } else if (responseData.message === "empty") {
                        toast.error("One or more fields are empty");
                        router.refresh()
                    } else {
                        toast.error("Something went wrong");
                        router.refresh()
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error("Something went wrong");
                    router.refresh()
                });
        },
        onClose: () => {
            toast.error('What went wrong?')
        },
    };

    return (
        <>
            <ToastContainer />
            <div className="grid">
                <div className="unit golden-large">
                    <div className="flex-video experience-video" style={{ height: "600px" }}>
                        <img src={`/images/contestants/${contestant.picture}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <Dialog>
                        <DialogTrigger className='w-full'>
                            <div className='w-full py-3 mb-10' style={{ background: "#F5245F", color: "white" }}><i className='fa fa-check mr-3'></i>Vote for {contestant.name}</div>
                        </DialogTrigger>
                        <DialogContent style={{ background: "#16171C", border: "none" }}>
                            <DialogHeader>
                                <DialogTitle>Please Note</DialogTitle>
                                <DialogDescription>
                                    One Vote costs ₦100 and you can vote as many times as you wish. Be aware that your votes only count if it is within
                                    the voting window for the current round.

                                    <div className='mt-8'>
                                        <h5>Amount: ₦{totalAmount}</h5>
                                        <input
                                            type="number"
                                            placeholder='Input number of Votes'
                                            value={votes}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <PaystackButton className="button w-100"{...componentProps}></PaystackButton>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <div
                        className="w-full p-3 text-center mb-10"
                        style={{ background: "#F5245F", color: "white", cursor: "pointer" }}
                        onClick={() => {
                            const currentURL = window.location.href; // Get current page URL
                            navigator.clipboard.writeText(currentURL) // Copy URL to clipboard
                                .then(() => {
                                    toast.success('Link copied to clipboard');
                                })
                                .catch(err => {
                                    toast.error('Failed to copy: ', err);
                                });
                        }}
                    >
                        <i className="fa fa-copy mr-3"></i>Copy Link
                    </div>

                    <h3 className="borderr">Biography</h3>
                    <div className="experience-box">
                        {/* <div className="experience-title">
                            <h5>Model Fashion Academy</h5>
                            <p>2006 – 2010</p>
                        </div> */}
                        <p>{contestant.bio}</p>
                    </div>
                    <div className="experience-box" style={{ display: "block" }}>
                        <div className="experience-title">
                            <h5>Contestant Vote Timeline</h5>
                            <p>Contestant Performance in each round</p>
                        </div>

                        {/* Timeline component */}
                        <div className="timeline">
                            <ul>
                                {
                                    contestant.user_sessions.map(session => (
                                        <li key={session.id}>
                                            <div className="timeline-content">
                                                <h6>{session.round.name}</h6>
                                                <p>Number of Votes: {session.votes} <br /> Judges Vote: {session.judge_votes} <br /> Score: {session.score} </p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="unit golden-small">
                    <div className='w-full p-3' style={{ background: "#F5245F", color: "white" }}>Contestant Details</div>
                    <div className="ombre-box mt-5">
                        <ul className="ombre-table">
                            <li>
                                <div className="ombre-table-left">CATEGORY</div>
                                <div className="ombre-table-right">{contestant.category}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">TYPE</div>
                                <div className="ombre-table-right">{contestant.type}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">AGE</div>
                                <div className="ombre-table-right">{contestant.age_grade}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">GENDER</div>
                                <div className="ombre-table-right">{contestant.gender}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">PROVINCE</div>
                                <div className="ombre-table-right">{contestant.province}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">REGION</div>
                                <div className="ombre-table-right">{contestant.region}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">STATE</div>
                                <div className="ombre-table-right">{contestant.state}</div>
                            </li>
                            <li>
                                <div className="ombre-table-left">COUNTRY</div>
                                <div className="ombre-table-right">{contestant.country}</div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Single