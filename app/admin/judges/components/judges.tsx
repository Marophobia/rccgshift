'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Iadmin } from '@/app/types/admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    judges: Iadmin[];
};

const JudgesTable = (props: Props) => {
    const { judges } = props;
    const router = useRouter();

    const handleClick = async (id: number, status: boolean) => {
        // Call the API route to update the status
        try {
            const response = await fetch(`${apiUrl}/api/admin/judges/status`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status }), // Toggle status
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Failed to update: ', error);
                toast.error('An error occurred');
            }
            toast.success('Setting Changed');
            router.refresh();
        } catch (error) {
            console.error(
                'An error occurred while updating skip status:',
                error
            );
            toast.error('An error occurred');
        }
    };

    return (
        <>
            <div className="card p-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {judges.map((judge, index) => (
                            <TableRow key={judge.id}>
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{judge.name}</TableCell>
                                <TableCell>{judge.email}</TableCell>
                                <TableCell>
                                    {judge.status ? (
                                        <Button
                                            onClick={() =>
                                                handleClick(judge.id, false)
                                            }
                                        >
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleClick(judge.id, true)
                                            }
                                            variant={'destructive'}
                                        >
                                            Activate
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>Judge</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default JudgesTable;
