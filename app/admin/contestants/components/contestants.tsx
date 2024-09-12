'use client';
import { Icontestants } from '@/app/types/contestants';
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
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';

type Props = {
    contestants: Icontestants[];
};

const ContestantTable = (props: Props) => {
    const { contestants } = props;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 20;

    // Calculate the indexes for slicing the contestants array
    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = contestants.slice(
        indexOfFirstContestant,
        indexOfLastContestant
    );

    const totalPages = Math.ceil(contestants.length / contestantsPerPage);

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
                    body: JSON.stringify({ id: id, type: 'delete' }),
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
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            {/* <TableHead>Bio</TableHead> */}
                            <TableHead>Number</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            {/* <TableHead>Age</TableHead> */}
                            <TableHead>Gender</TableHead>
                            <TableHead>Country</TableHead>
                            {/* <TableHead>State</TableHead> */}
                            <TableHead>Region</TableHead>
                            {/* <TableHead>Regional Pastor</TableHead> */}
                            {/* <TableHead>Province</TableHead> */}
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
                                <TableCell>{contestant.name}</TableCell>
                                <TableCell>{contestant.email}</TableCell>
                                {/* <TableCell>{contestant.bio}</TableCell> */}
                                <TableCell>{contestant.telephone}</TableCell>
                                <TableCell>{contestant.category}</TableCell>
                                <TableCell>
                                    {contestant.type}{' '}
                                    {contestant.type === 'Group' ? (
                                        <span>
                                            : {contestant.number_of_members}
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                </TableCell>
                                {/* <TableCell>{contestant.age_grade}</TableCell> */}
                                <TableCell>{contestant.gender}</TableCell>
                                <TableCell>{contestant.country}</TableCell>
                                {/* <TableCell>{contestant.state}</TableCell> */}
                                <TableCell>{contestant.region}</TableCell>
                                {/* <TableCell>
                                    {contestant.regional_pastor}
                                </TableCell> */}
                                {/* <TableCell>{contestant.province}</TableCell> */}
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
                                        <Eye size={20} />
                                    </Link>
                                    {/* <Trash2
                                        size={20}
                                        className="mt-3"
                                        onClick={() =>
                                            deleteUser(contestant.id)
                                        }
                                    /> */}
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
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={
                                        currentPage === index + 1
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
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
