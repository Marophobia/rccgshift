"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import { IuserSession } from '../../types/user_session'
import Link from 'next/link'

type Props = {
    rounds: {
        id: number,
        name: string,
        status: boolean,
        users: IuserSession[]
    }[],
    settings: {
        id: number,
        current_round: number,
        status: boolean
        competition: number
    }
}

const Rounds = (props: Props) => {
    const { rounds, settings } = props
    console.log(settings)

    return (
        <>
            <div className='grid'>
                {
                    settings.competition ? (
                        rounds.map((round, index) => (
                            round.id <= settings.current_round && (
                                <div className='unit one-third' key={round.id}>
                                    <Card style={{ background: "#111118", border: "none" }} className='text-center'>
                                        <CardHeader>
                                            <CardTitle>
                                                <div className='flex justify-between'>
                                                    {round.name}

                                                    {
                                                        settings.competition === 2 ? <p><span className="text-red-600">Finished</span></p> :
                                                            round.id === settings.current_round ? (
                                                                <p><span className="text-green-600">Current Round</span></p>
                                                            ) : round.users.length > 0 ? (
                                                                <p><span className="text-red-600">Finished</span></p>
                                                            ) : (
                                                                <p><span className="text-yellow-600">Upcoming</span></p>
                                                            )
                                                    }
                                                </div>
                                            </CardTitle>
                                            <CardDescription></CardDescription>
                                        </CardHeader>
                                        <CardContent className='pb-12'>
                                            <p>{round.name} of the RCCG SHIFT COMPETITION 2024 - YOU MUST SHINE</p>
                                            <div className='flex gap-3 justify-center'>
                                                <div className='px-3 py-2 text-white my-5' style={{ background: "#363635" }}>Contestants: {round.users.length}</div>
                                                <div className='px-3 py-2 text-white my-5' style={{ background: "#363635" }}>Qualifiers: {index + 1 < rounds.length ? rounds[index + 1].users.length : round.users.length}</div>
                                            </div>
                                            <Link className='button text-center w-full' href={`/results/${round.id}`} style={{ background: "#F5245F", color: "white" }}> View Results</Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        ))
                    ) : (
                        <h3>Competition Not Yet Started</h3>
                    )

                }



            </div>
        </>
    )
}

export default Rounds