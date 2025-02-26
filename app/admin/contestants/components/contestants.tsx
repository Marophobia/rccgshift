'use client';
import { Icontestants } from '@/app/types/contestants';
import { Iseason } from '@/app/types/round';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { UserStatus } from '@/app/types/contestants';
import { Download, Eye, Trash, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    contestants: Icontestants[];
    seasons: Iseason[];
};

const ContestantTable = (props: Props) => {
    const { contestants, seasons } = props;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 20;
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<'all' | 'paid' | 'unpaid'>('all');
    const [filteredContestants, setFilteredContestants] = useState<Icontestants[]>(contestants);

    useEffect(() => {
        // Filter contestants based on selected season and payment status
        const filtered = contestants.filter(contestant => {
            const matchesSeason = selectedSeason ? contestant.seasonId === selectedSeason : true;
            const matchesPayment = paymentStatus === 'all' ? true : paymentStatus === 'paid' ? contestant.paid : !contestant.paid;
            return matchesSeason && matchesPayment;
        });
        setFilteredContestants(filtered);
    }, [selectedSeason, paymentStatus, contestants]);

    // Calculate the indexes for slicing the contestants array
    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = filteredContestants.slice(
        indexOfFirstContestant,
        indexOfLastContestant
    );

    const totalPages = Math.ceil(filteredContestants.length / contestantsPerPage);

    const approve = async (id: number) => {
        try {
            const update = await fetch(
                `${apiUrl}/api/admin/contestants/actions`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id, type: 'approve' }),
                }
            );

            if (update.ok) {
                toast.success('Action Completed');
                router.refresh();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const disqualify = async (id: number) => {
        try {
            const update = await fetch(
                `${apiUrl}/api/admin/contestants/actions`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id, type: 'disqualify' }),
                }
            );

            if (update.ok) {
                toast.success('Action Completed');
                router.refresh();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const update = await fetch(
                `${apiUrl}/api/admin/contestants/actions`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id, type: 'deleteUser' }),
                }
            );

            if (update.ok) {
                toast.success('Contestant Deleted');
                router.refresh();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const download = () => {
        console.log('download contestants');
    };

    return (
        <>
            <div className="card p-5">
                {/* Season Selector */}
                <div className="mb-4">
                    <label htmlFor="season-select" className="block text-sm font-medium mb-2">
                        Select Season:
                    </label>
                    <Select
                        value={String(selectedSeason || '')}
                        onValueChange={(value) => setSelectedSeason(Number(value))}
                    >
                        <SelectTrigger className="w-full border rounded-lg px-4 py-2 text-gray-900">
                            <SelectValue placeholder="Choose a season" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Assuming you have a list of seasons available */}
                            {seasons.map((season) => (
                                <SelectItem key={season.id} value={String(season.id)}>
                                    {season.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Payment Status Filter */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Payment Status:</label>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="paymentStatus"
                                value="all"
                                className='mr-2'
                                checked={paymentStatus === 'all'}
                                onChange={() => setPaymentStatus('all')}
                            />
                            All
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentStatus"
                                value="paid"
                                checked={paymentStatus === 'paid'}
                                onChange={() => setPaymentStatus('paid')}
                                className='mr-2'
                            />
                            Paid
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentStatus"
                                value="unpaid"
                                checked={paymentStatus === 'unpaid'}
                                onChange={() => setPaymentStatus('unpaid')}
                                className='mr-2'
                            />
                            Unpaid
                        </label>
                    </div>
                </div>

                {/* <div className="w-full flex justify-end">
                    <button
                        className="btn b-solid btn-primary-solid text-white mb-5"
                        onClick={download}
                    >
                        Download PDF <Download size={15} />{' '}
                    </button>
                </div> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Tag</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Competition</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Province</TableHead>
                            <TableHead>Paid</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentContestants.map((contestant, index) => (
                            <TableRow key={contestant.id}>
                                <TableCell className="font-medium">
                                    {indexOfFirstContestant + index + 1}
                                </TableCell>
                                <TableCell>{contestant.tag}</TableCell>
                                <TableCell>{contestant.name}</TableCell>
                                <TableCell>{contestant.email}</TableCell>
                                <TableCell>{contestant.telephone}</TableCell>
                                <TableCell>{contestant.competitionType === 1 ? 'Internation Shift' : 'Chior Competition'}</TableCell>
                                <TableCell>{contestant.category}</TableCell>
                                <TableCell>
                                    {contestant.type}{' '}
                                    {contestant.type === 'Group' ? (
                                        <span>
                                            : {contestant.Group?.GroupMembers?.length}
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                </TableCell>
                                <TableCell>{contestant.age_grade}</TableCell>
                                <TableCell>{contestant.gender}</TableCell>
                                <TableCell>{contestant.country}</TableCell>
                                <TableCell>{contestant.state}</TableCell>
                                <TableCell>{contestant.region}</TableCell>
                                <TableCell>{contestant.province}</TableCell>
                                <TableCell>{contestant.paid ? 'True' : 'False'}</TableCell>
                                <TableCell>
                                    {contestant.status ==
                                    UserStatus.approved ? (
                                        <span className="text-green-600 font-bold">
                                            {contestant.status}
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-bold">
                                            {contestant.status}
                                        </span>
                                    )}
                                </TableCell>
                                {contestant.status !== UserStatus.approved ? (
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                approve(contestant.id)
                                            }
                                        >
                                            Approve
                                        </Button>
                                    </TableCell>
                                ) : (
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                disqualify(contestant.id)
                                            }
                                            variant="destructive"
                                        >
                                            Disqualify
                                        </Button>
                                    </TableCell>
                                )}
                                <TableCell className="flex justify-center gap-2">
                                    <Link
                                        className="pt-3"
                                        href={`/admin/contestants/${contestant.id}`}
                                    >
                                        <Eye size={15} />
                                    </Link>
                                    <Trash2
                                        size={15}
                                        className="mt-3"
                                        onClick={() =>
                                            deleteUser(contestant.id)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prevPage) =>
                                        Math.max(prevPage - 1, 1)
                                    )
                                }
                            />
                        </PaginationItem>

                        {/* Show the first page and ellipsis if the current page is far from the start */}
                        {currentPage > 2 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === 1}
                                        onClick={() => setCurrentPage(1)}
                                        className={
                                            currentPage === 1 ? 'active' : ''
                                        }
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                {currentPage > 3 && <PaginationEllipsis />}
                            </>
                        )}

                        {/* Show current page, and adjacent pages */}
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            if (
                                page === currentPage ||
                                page === currentPage - 1 ||
                                page === currentPage + 1
                            ) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={() => setCurrentPage(page)}
                                            className={
                                                currentPage === page
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                            return null;
                        })}

                        {/* Show ellipsis and the last page if the current page is far from the end */}
                        {currentPage < totalPages - 1 && (
                            <>
                                {currentPage < totalPages - 2 && (
                                    <PaginationEllipsis />
                                )}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage(totalPages)
                                        }
                                        className={
                                            currentPage === totalPages
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prevPage) =>
                                        Math.min(prevPage + 1, totalPages)
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default ContestantTable;
