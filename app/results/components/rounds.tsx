"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import { IuserSession } from '../../types/user_session'
import Link from 'next/link'
import { Iseason } from '@/app/types/round'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from "react"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    },
    season: Iseason[]
}

const Rounds = (props: Props) => {
    const { rounds, settings, season } = props
    const [roundData, setRoundData] = useState(rounds)
    const currentSeason = season.reduce((prev, curr) => (curr.id > prev.id ? curr : prev));
    const [activeSeason, setActiveSeason] = useState(currentSeason);
    const [loading, setLoading] = useState(false);

    // Fetch contestants for a specific season
    const fetchRoundsForSeason = async (seasonId: number) => {
        console.log("We are here")
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/admin/rounds/season`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seasonId }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to update: ', error)
            }

            const data = await response.json();
            setRoundData(data.data)

        } catch (error) {
            console.error(
                'An error occurred while fetching contestants:',
                error
            )
        } finally {
            setLoading(false);
        }

    };

    // Handle season selection
    const handleSeasonChange = (seasonId: number) => {
        const selectedSeason = season.find((s) => s.id === seasonId);
        if (!selectedSeason) return;

        setActiveSeason(selectedSeason);

        if (seasonId === currentSeason.id) {
            // If the selected season is the current season, use the initial data
            setRoundData(rounds);
        } else {
            // Fetch data for the selected season
            fetchRoundsForSeason(seasonId);
        }
    };

    return (
        <>
            <div className='grid'>

                {/* Season Selector */}
                <div className="mb-6">
                    <label htmlFor="season-select" className="block text-sm font-medium mb-2">
                        Select Season:
                    </label>
                    <Select
                        value={String(activeSeason.id)} // Ensure it's a string for the Select component
                        onValueChange={(value) => handleSeasonChange(Number(value))} // Convert back to a number
                    >
                        <SelectTrigger className="w-full border rounded-lg px-4 py-2 text-gray-900">
                            <SelectValue placeholder="Choose a season" />
                        </SelectTrigger>
                        <SelectContent>
                            {season.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                    {s.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {
                    settings.competition ? (
                        roundData.map((round, index) => (
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

// function useState(arg0: boolean): [any, any] {
//     throw new Error('Function not implemented.')
// }
