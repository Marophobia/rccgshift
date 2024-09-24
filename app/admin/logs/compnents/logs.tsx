'use client';
import { Ilogs } from '@/app/types/logs';
import React, { useState } from 'react';
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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

type Props = {
    logs: Ilogs[];
};

const LogsTable = ({ logs }: Props) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const logsPerPage = 20;

    const formatTag = (tag: number) => tag.toString().padStart(3, '0');

    // Apply filter first
    let filteredLogs = logs.filter((log) => {
        const tag = log.candidate ? formatTag(Number(log.candidate)) : '';
        const name = log.action.toLowerCase();
        const session = log.session.toLocaleLowerCase();
        return (
            tag.includes(searchQuery) ||
            name.includes(searchQuery.toLowerCase())
        );
    });

    // Apply pagination after filtering
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const paginatedLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

    return (
        <>
            <div className="card p-5">
                <div className="flex flex-wrap space-y-5 mb-5 items-center justify-between">
                    <div className="">
                        <Input
                            type="text"
                            placeholder="Search by name or tag"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <Separator />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Candidate Tag</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Session</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedLogs.map((log, index) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">
                                    {indexOfFirstLog + index + 1}
                                </TableCell>
                                <TableCell>
                                    {log.action.toUpperCase()}
                                </TableCell>
                                <TableCell>{log.candidate || 'N/A'}</TableCell>
                                <TableCell>
                                    {log.amount !== null
                                        ? log.amount + ' NGN'
                                        : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {log.session || 'No session'}
                                </TableCell>
                                <TableCell>
                                    {log.description || 'No description'}
                                </TableCell>
                                <TableCell>
                                    {new Date(log.time).toLocaleDateString(
                                        'en-GB'
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(log.time).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage((prevPage) =>
                                        Math.max(prevPage - 1, 1)
                                    );
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage((prevPage) =>
                                        Math.min(prevPage + 1, totalPages)
                                    );
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default LogsTable;