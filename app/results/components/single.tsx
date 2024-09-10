'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // To generate table in PDF
import { IuserSession } from '../../types/user_session';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';

type Props = {
    participants: IuserSession[];
    qualifiers: number;
};

const Participants = (props: Props) => {
    const { participants, qualifiers } = props;
    const [searchQuery, setSearchQuery] = useState('');

    // Format tags to always be three digits
    const formatTag = (tag: number) => tag.toString().padStart(3, '0');

    // Filter participants based on search query
    const filteredParticipants = participants.filter((participant) => {
        const tag = formatTag(participant.user_id); // Format the tag
        const name = participant.user.name.toLowerCase(); // Participant name in lowercase
        return (
            tag.includes(searchQuery) ||
            name.includes(searchQuery.toLowerCase())
        );
    });

    // Download the table data as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            'S/N',
            'Tags',
            'Name',
            'Category',
            'Vote Points',
            'Judge Votes',
            'Total Score',
            'Verdict',
        ];
        const tableRows: any[] = [];

        participants.forEach((participant, index) => {
            const rowData = [
                index + 1,
                formatTag(participant.user.id),
                participant.user.name,
                participant.user.category,
                participant.votes,
                [
                    participant.judge_votes1,
                    participant.judge_votes2,
                    participant.judge_votes3,
                ],
                participant.score,
                participant.qualified,
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save('participants.pdf');
    };

    return (
        <>
            <div className="grid">
                <div className="unit whole">
                    {qualifiers ? (
                        <>
                            <div className="grid">
                                <div className="unit two-thirds">
                                    <input
                                        type="text"
                                        placeholder="Search by name or tag"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        } // Update search query on input change
                                        className="input"
                                    />
                                </div>
                                <div className="unit one-third">
                                    <button
                                        onClick={downloadPDF}
                                        className="button"
                                    >
                                        <i className="fa fa-download mr-3"></i>
                                        Download as PDF
                                    </button>
                                </div>
                            </div>

                            <Table id="participants-table">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            S/N
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Tag No.</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Votes</TableHead>
                                        <TableHead className="text-center">
                                            Judge Votes
                                        </TableHead>
                                        <TableHead>Total Score</TableHead>
                                        <TableHead>Verdict</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredParticipants.length > 0 ? (
                                        filteredParticipants.map(
                                            (participant, index) => (
                                                <TableRow
                                                    key={participant.id}
                                                    className={
                                                        participant.qualified !==
                                                        null
                                                            ? participant.qualified
                                                                ? 'text-green-100'
                                                                : 'text-red-100'
                                                            : ''
                                                    }
                                                >
                                                    <TableCell className="font-medium">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatTag(
                                                            participant.user.id
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            participant.user
                                                                .category
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.user.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.votes}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-around gap-3 items-center">
                                                            <div>
                                                                {
                                                                    participant.judge_votes1
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    participant.judge_votes2
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    participant.judge_votes3
                                                                }
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {participant.score}
                                                    </TableCell>
                                                    <TableCell>
                                                        {participant.qualified ? (
                                                            <span className="text-green-500">
                                                                Qualified
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-500">
                                                                Disqualified
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link
                                                            href={`/contestants/${participant.user_id}`}
                                                        >
                                                            <EyeIcon />
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center"
                                            >
                                                No participants match your
                                                search.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </>
                    ) : (
                        <div>
                            <h3>Results Not Yet Available</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Participants;
