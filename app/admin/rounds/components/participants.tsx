"use client"
import { Isettings } from "@/app/types/settings";
import { IuserSession } from "@/app/types/user_session";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ToastContainer, toast } from 'react-toastify';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useRouter } from "next/navigation";


type Props = {
    participants: IuserSession[],
    status: boolean,
    settings: Isettings,
    id: number,
    qualifiers: number
}

const Participants = (props: Props) => {
    const { id, participants, status, qualifiers } = props;
    const router = useRouter()

    const disable = async (id: number) => {
        try {
            const update = await fetch(`${apiUrl}/api/admin/rounds/actions`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, type: 'disable' })
            });

            if (update.ok) {
                toast.success('Voting Stopped');
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
    }

    const activate = async (id: number) => {
        try {
            const update = await fetch(`${apiUrl}/api/admin/rounds/actions`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, type: 'activate' })
            });

            if (update.ok) {
                toast.success('Voting Started');
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
    }

    return (
        <>
            <div className="card p-5">
                <div>
                    <div className="flex my-5">
                        <h1 className="mr-5 mt-2">Actions: </h1>
                        {status ? <Button variant="destructive" onClick={() => disable(id)}>Disable Voting</Button> : <Button onClick={() => activate(id)} className="bg-green-600">Activate Voting</Button>}
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Votes</TableHead>
                            <TableHead>Judge Votes</TableHead>
                            <TableHead>Total Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.map((participant, index) => (
                            <TableRow
                                key={participant.id}
                                className={qualifiers ? index < qualifiers ? 'bg-green-100' : 'bg-red-100' : ''}
                            >
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{participant.user.name}</TableCell>
                                <TableCell>{participant.user.email}</TableCell>
                                <TableCell>{participant.user.category}</TableCell>
                                <TableCell>{participant.user.type}</TableCell>
                                <TableCell>{participant.votes}</TableCell>
                                <TableCell>{participant.judge_votes}</TableCell>
                                <TableCell>{participant.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>


            </div>
        </>
    );
}

export default Participants
