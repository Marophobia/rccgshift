"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icontestants, IGroup } from '../../types/contestants'
import { Iseason } from '@/app/types/round'
import { toast } from 'react-toastify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    data: Icontestants[]
    season: Iseason[]
}

const Card = (props: Props) => {
    const { data, season } = props

    const currentSeason = season.reduce((prev, curr) => (curr.id > prev.id ? curr : prev));
    const [activeSeason, setActiveSeason] = useState(currentSeason);
    const [loading, setLoading] = useState(false);
    const [seasonContestants, setSeasonContestants] = useState(data);
    const [activeType, setActiveType] = useState<number | null>(1);


    // Fetch contestants for a specific season
    const fetchContestantsForSeason = async (seasonId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/seasons/contestants`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seasonId }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to update: ', error);
                toast.error('An error occurred');
            }

            const data = await response.json();
            setSeasonContestants(data.data);
            setFilteredContestants(data.data);

        } catch (error) {
            console.error(
                'An error occurred while fetching contestants:',
                error
            );
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }

    };

    // Fetch contestants for a specific season and type
    const fetchContestantsForType = async (seasonId: number, type: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/seasons//type`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seasonId, type }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to update: ', error);
                toast.error('An error occurred');
            }

            const data = await response.json();
            console.log(data)
            setSeasonContestants(data.data);
            setFilteredContestants(data.data);

        } catch (error) {
            console.error(
                'An error occurred while fetching contestants:',
                error
            );
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }

    };

    // Handle season selection
    const handleSeasonChange = (seasonId: number) => {
        setActiveType(1)
        const selectedSeason = season.find((s) => s.id === seasonId);
        if (!selectedSeason) return;

        setActiveSeason(selectedSeason);

        if (seasonId === currentSeason.id) {
            // If the selected season is the current season, use the initial data
            setSeasonContestants(data);
            setFilteredContestants(data);
        } else {
            // Fetch data for the selected season
            fetchContestantsForSeason(seasonId);
        }
    };

    const handleTypeChange = (type: number) => {

        setActiveType(type)
        fetchContestantsForType(activeSeason.id, type);

    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [contestantsPerPage] = useState(9)

    // Search state
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredContestants, setFilteredContestants] = useState(data)

    const sortByTag = (a: Icontestants, b: Icontestants) => a.tag - b.tag;
    useEffect(() => {
        const filtered = seasonContestants
            .filter(contestant =>
                contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(contestant.tag).includes(searchTerm)
            )
            .sort(sortByTag);
        
        setFilteredContestants(filtered);
        setCurrentPage(1); // Reset to page 1 on search
    }, [searchTerm, seasonContestants]);

    // Calculate the contestants for the current page
    const indexOfLastContestant = currentPage * contestantsPerPage
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage
    const currentContestants = filteredContestants.slice(indexOfFirstContestant, indexOfLastContestant).sort(sortByTag)

    // Handle page navigation
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top when changing page
    }

    const totalPages = Math.ceil(filteredContestants.length / contestantsPerPage)

    // Calculate showing X-Y of Z
    const showingStart = indexOfFirstContestant + 1
    const showingEnd = Math.min(indexOfLastContestant, filteredContestants.length)
    const totalDataCount = filteredContestants.length

    // Generate pagination with only previous, current, and next page
    const renderPagination = () => {
        const pages: JSX.Element[] = [] // Explicitly type the array as JSX.Element[]

        if (currentPage > 1) {
            pages.push(
                <button key={currentPage - 1} onClick={() => paginate(currentPage - 1)} className="button">
                    {currentPage - 1}
                </button>
            )
        }

        pages.push(
            <button key={currentPage} onClick={() => paginate(currentPage)} className="button" style={{ background: "#F5245F", color: "white" }}>
                {currentPage}
            </button>
        )

        if (currentPage < totalPages) {
            pages.push(
                <button key={currentPage + 1} onClick={() => paginate(currentPage + 1)} className="button">
                    {currentPage + 1}
                </button>
            )
        }

        return pages
    }

    return (
        <>
            <style jsx>{`.grid:before, .grid:after {display: none !important;}`}</style>
            <div>

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

                <div className="flex flex-col items-center space-y-4 pb-10 md:flex-row md:space-x-4 md:space-y-0">
                    <Button
                        onClick={() => handleTypeChange(1)}
                        className={`py-5 w-full text-white transition-all ${activeType === 1 ? "bg-green-500 hover:bg-green-600" : "bg-neutral-500 hover:bg-neutral-600"
                            }`}
                    >
                        International Shift Talent Hunt
                    </Button>
                    <Button
                        onClick={() => handleTypeChange(2)}
                        className={`py-5 w-full text-white transition-all ${activeType === 2 ? "bg-green-500 hover:bg-green-600" : "bg-neutral-500 hover:bg-neutral-600"
                            }`}
                    >
                        Shift Choir Competition
                    </Button>
                </div>


                {/* Search Box */}
                <div className="unit whole" style={{ padding: "0px" }}>
                    <div className='searchbox'>
                        <input
                            className='form-control w-50'
                            type='text'
                            placeholder='Search By Name or Tag'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on keystroke
                        />
                    </div>
                    <div className="showing-description text-center" style={{ marginBottom: '30px' }}>
                        Showing {showingStart}-{showingEnd} of {totalDataCount} Contestants
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                            {/* Contestant Cards */}
                            {
                                currentContestants.map(contestant => (
                                    <div className='col-span-1' key={contestant.id}>
                                        <div className="grid-container">
                                            <div className="grid-img">
                                                <Link href={`/contestants/${contestant.id}`} className="gallery link">
                                                    <div className="h-96">
                                                        <img
                                                            src={`https://images.rccgshift.org/${contestant.picture}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                                            alt="Contestant"
                                                        />
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="grid-content" style={{ padding: "20px" }}>
                                                <p style={{ fontSize: '19px' }}>
                                                    <Link href={`/contestants/${contestant.id}`}>
                                                        {activeType === 2 || contestant.type === 'Group' ? (
                                                            `${contestant.Group?.name} (${String(contestant.tag).padStart(3, '0')})`
                                                        ) : (
                                                            `${contestant.name} (${String(contestant.tag).padStart(3, '0')})`
                                                        )}
                                                    </Link>
                                                </p>
                                            </div>
                                            <Link className="arrow-button" href={`/contestants/${contestant.id}`}>
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        <div className="blogpager unit whole" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            {/* Previous button */}
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="button"
                            >
                                <i className="fa fa-chevron-left"></i> Prev
                            </button>

                            {/* Render only previous, current, and next page numbers */}
                            {renderPagination()}

                            {/* Next button */}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="button"
                            >
                                Next <i className="fa fa-chevron-right"></i>
                            </button>

                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Card
