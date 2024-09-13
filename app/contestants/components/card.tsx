"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icontestants } from '../../types/contestants'

type Props = {
    data: Icontestants[]
}

const Card = (props: Props) => {
    const { data } = props

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [contestantsPerPage] = useState(9)

    // Search state
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredContestants, setFilteredContestants] = useState(data)

    // Filter contestants based on search term (searches through entire data)
    useEffect(() => {
        const filtered = data.filter(contestant =>
            contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(contestant.id).includes(searchTerm)
        );
        setFilteredContestants(filtered)
        setCurrentPage(1) // Reset to page 1 on search
    }, [searchTerm, data])

    // Calculate the contestants for the current page
    const indexOfLastContestant = currentPage * contestantsPerPage
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage
    const currentContestants = filteredContestants.slice(indexOfFirstContestant, indexOfLastContestant)

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
                                                    src={`/images/contestants/${contestant.picture}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                                    alt="Contestant"
                                                />
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="grid-content" style={{ padding: "20px" }}>
                                        <p style={{ fontSize: '19px' }}>
                                            <Link href={`/contestants/${contestant.id}`}>
                                                {contestant.name} ({String(contestant.id).padStart(3, '0')})
                                            </Link>
                                        </p>
                                    </div>
                                    <Link className="arrow-button" href={`/contestants/${contestant.id}`}>View Profile</Link>
                                </div>
                            </div>
                        ))
                    }

                </div>

                {/* Pagination Controls */}
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
            </div>
        </>
    )
}

export default Card
