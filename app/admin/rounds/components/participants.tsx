'use client';
import { Isettings } from '@/app/types/settings';
import { IuserSession } from '@/app/types/user_session';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // To generate table in PDF
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';

type Props = {
    participants: IuserSession[];
    status: boolean;
    settings: Isettings;
    id: number;
    qualifiers: number;
};

const Participants = (props: Props) => {
    const { id, participants, status, qualifiers } = props;
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const changeVoting = async (id: number, type: string) => {
        try {
            const update = await fetch(`${apiUrl}/api/admin/rounds/actions`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type }),
            });
            const successmessage =
                type === 'disable' ? 'Voting Stopped' : 'Voting Started';
            if (update.ok) {
                toast.success(successmessage);
                router.refresh();
            } else if (update.status === 401) {
                toast.error('Denied! This round is not the current round');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    const vetoQualify = async (user_id: number, id: number) => {
        try {
            const update = await fetch(`${apiUrl}/api/admin/rounds/qualify`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, id }),
            });
            if (update.ok) {
                toast.success('Contestant qualified');
                router.refresh();
            } else if (update.status === 401) {
                toast.error('Denied! This round is not the current round');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    };

    // Format tags to always be three digits
    const formatTag = (tag: number) => tag.toString().padStart(3, '0');
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
            <div className="card p-5">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex my-5">
                        <h1 className="mr-5 mt-2">Actions: </h1>
                        {status ? (
                            <Button
                                variant="destructive"
                                onClick={() => changeVoting(id, 'disable')}
                            >
                                Disable Voting
                            </Button>
                        ) : (
                            <Button
                                onClick={() => changeVoting(id, 'activate')}
                                className="bg-green-600"
                            >
                                Activate Voting
                            </Button>
                        )}
                    </div>
                </div>
                <Separator />
                <div className="flex flex-wrap space-y-5 mb-5 items-center justify-between">
                    <div className="">
                        <Input
                            type="text"
                            placeholder="Search by name or tag"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={downloadPDF}
                        className="btn btn-primary-solid text-white"
                    >
                        <i className="fa fa-download mr-3"></i>
                        Download as PDF
                    </button>
                </div>
                <Separator />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Tag No.</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Votes</TableHead>
                            <TableHead className="text-center">
                                Judge Votes
                            </TableHead>
                            <TableHead>Total Score</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.map((participant, index) => (
                            <TableRow
                                key={participant.id}
                                className={
                                    participant.qualified !== null
                                        ? participant.qualified
                                            ? 'bg-green-100'
                                            : 'bg-red-100'
                                        : ''
                                }
                            >
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{participant.user.name}</TableCell>
                                <TableCell>
                                    {formatTag(participant.user.id)}
                                </TableCell>
                                <TableCell>{participant.user.email}</TableCell>
                                <TableCell>
                                    {participant.user.category}
                                </TableCell>
                                <TableCell>{participant.user.type}</TableCell>
                                <TableCell>{participant.votes}</TableCell>
                                <TableCell>
                                    <div className="flex justify-around gap-3 items-center">
                                        <div>{participant.judge_votes1}</div>
                                        <div>{participant.judge_votes2}</div>
                                        <div>{participant.judge_votes3}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    {participant.score}
                                </TableCell>
                                <TableCell>
                                    {participant.qualified !== null ? (
                                        participant.qualified ? (
                                            <span className="text-green-500">
                                                Qualified
                                            </span>
                                        ) : id === 3 ? (
                                            <Button
                                                onClick={() => {
                                                    vetoQualify(
                                                        participant.user_id,
                                                        participant.id
                                                    );
                                                }}
                                            >
                                                Veto Qualify
                                            </Button>
                                        ) : (
                                            <span className="text-red-500">
                                                Disqualified
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-yellow-500">
                                            Pending
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <Link
                                        href={`/admin/contestants/${participant.user_id}`}
                                    >
                                        <EyeIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Participants;
