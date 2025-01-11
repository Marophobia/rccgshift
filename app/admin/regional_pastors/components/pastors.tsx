'use client';
import {
    Table,
    TableBody,
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
import { IregionalPastors } from '@/app/types/regionalPastor';
import { Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import Editentry from './editentry';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

type Props = {
    pastors: IregionalPastors[];
};

const PastorsTable = ({ pastors }: Props) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const pastorsPerPage = 20;
    const [loading, setLoading] = useState(false)

    // Calculate the indexes for slicing the pastors array
    const indexOfLastPastor = currentPage * pastorsPerPage;
    const indexOfFirstPastor = indexOfLastPastor - pastorsPerPage;
    const currentpastors = pastors.slice(indexOfFirstPastor, indexOfLastPastor);

    const totalPages = Math.ceil(pastors.length / pastorsPerPage);

    const deleteEntry = async (id: number) => {
        try {
            const update = await fetch(
                `${apiUrl}/api/admin/pastors/actions/delete`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                }
            );

            if (update.ok) {
                toast.success('Entry Deleted');
                router.refresh();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const downloadPDF = () => {
        setLoading(true)
        const doc = new jsPDF();
        const tableColumn = [
            'S/N',
            'Name',
            'Region',
            'Province',
            'State',
            'Phone',
            'Regional Shifh Coord Name',
            'Regional Shift Coord Phone',
            'Assistant Regional Shifh Coord Name',
            'Assistant Regional Shifh Coord Phone',
            'Date',
        ];
        const tableRows: any[] = [];

        pastors.forEach((pastor, index) => {
            const rowData = [
                index + 1,
                pastor.name,
                pastor.region,
                pastor.province,
                pastor.phone,
                pastor.regional_shift_coordinator_name,
                pastor.regional_shift_coordinator_phone,
                pastor.assistant_regional_shift_coordinator_name,
                pastor.assistant_regional_shift_coordinator_phone,
                new Date(pastor.createdAt).toLocaleDateString(),
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save('regionalshiftcoord.pdf');
        setLoading(false)
    };

    return (
        <>
            <div className="card p-5">
                <div className="w-full flex justify-end">
                    <button
                        className="btn b-solid btn-primary-solid text-white mb-5"
                        onClick={downloadPDF}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Downloading...</span>
                        ) : (
                            <>
                                <span>Download PDF</span>
                                <Download size={15} />
                            </>
                        )}
                    </button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Province</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>RS coordinator</TableHead>
                            <TableHead>RS coordinator phone</TableHead>
                            <TableHead>ARS coordinator</TableHead>
                            <TableHead>ARS coordinator phone</TableHead>
                            <TableHead>Uploaded At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentpastors.map((pastor, index) => (
                            <TableRow key={pastor.id}>
                                <TableCell className="font-medium">
                                    {indexOfFirstPastor + index + 1}
                                </TableCell>
                                <TableCell>{pastor.name}</TableCell>
                                <TableCell>{pastor.region}</TableCell>
                                <TableCell>{pastor.province ? pastor.province : 'No Province'}</TableCell>
                                <TableCell>{pastor.state}</TableCell>
                                <TableCell>{pastor.phone}</TableCell>
                                <TableCell>
                                    {pastor.regional_shift_coordinator_name}
                                </TableCell>
                                <TableCell>
                                    {pastor.regional_shift_coordinator_phone}
                                </TableCell>
                                <TableCell>
                                    {
                                        pastor.assistant_regional_shift_coordinator_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        pastor.assistant_regional_shift_coordinator_phone
                                    }
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        pastor.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>

                                <TableCell className="flex justify-center gap-2">
                                    {/* edit the entry */}
                                    <Editentry pastor={pastor} />
                                    <Trash2
                                        size={20}
                                        className="mt-3 cursor-pointer"
                                        onClick={() => deleteEntry(pastor.id)}
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

export default PastorsTable;
