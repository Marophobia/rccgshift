"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Iadmin } from "@/app/types/admin"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


type Props = {
    judges: Iadmin[]
}

const JudgesTable = (props: Props) => {
    const { judges } = props;
    return (
        <>
            <div className="card p-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S/N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {judges.map((judge, index) => (
                            <TableRow key={judge.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{judge.name}</TableCell>
                                <TableCell>{judge.email}</TableCell>
                                <TableCell>Judge</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </>
    );
}

export default JudgesTable
