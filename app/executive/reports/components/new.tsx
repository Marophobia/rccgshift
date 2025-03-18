'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    session: | {
        name: string;
        email: string;
        id: string | number;
        role: string;
    }
    | undefined,
};

const NewReport = (props: Props) => {
    const { session } = props;
    const [report, setReport] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [reportType, setReportType] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("report", report);

        const data = new FormData();

        //validate the form
        if (!title || !date || !reportType) {
            toast.error('Please fill all the fields');
            return;
        }

        //either a file or a report is required but not both
        if (!file && !report) {
            toast.error('Either a file or a report is required');
            return;
        }

        //check for both file and report
        if (file && report) {
            toast.error('Either a file or a report is required but not both');
            return;
        }
        //check if the file is a pdf
        if (file && file.type !== 'application/pdf') {
            toast.error('File must be a PDF');
            return;
        }

        //check if the file is too large
        if (file && file.size > 10 * 1024 * 1024) {
            toast.error('File must be less than 10MB');
            return;
        }
        const formData = {
            author: session?.id,
            title,
            date,
            report,
            type: reportType
        }

        if (file) {
            data.append('file', file);
        }
        
        data.append('input', JSON.stringify(formData));

        try {
            const update = await fetch(
                `${apiUrl}/api/officials/reports/new`,
                {
                    method: 'POST',
                    cache: 'no-store',
                    body: data,
                }
            );

            if (update.ok) {
                toast.success('Report added successfully');
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
            <div className="col-span-full 2xl:col-span-4 card">
                <div className="flex-center-between">
                    <h6 className="card-title">Add New Report</h6>
                </div>
                {/* Course Table */}
                <Card className="mx-auto py-3 shadow-md border rounded-2xl my-5 bg-white">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Report Title</Label>
                                    <Input type="text" id="name" name="name" placeholder="Title of the report" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date and time of the meeting</Label>
                                    <Input type="datetime-local" id="date" name="date" onChange={(e) => setDate(e.target.value)} />
                                </div>
                                {/* report type (file or text) */}
                                <div className="space-y-2">
                                    <Label htmlFor="reportType">Report Type</Label>
                                    <Select onValueChange={(value) => setReportType(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a report type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="file">File</SelectItem>
                                            <SelectItem value="text">Text</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                     

                            {reportType === 'text' && (
                                <div className="space-y-2">
                                    <Label htmlFor="report">Report</Label>
                                    <ReactQuill theme="snow" placeholder="Write your report here..." onChange={(value) => setReport(value)} />
                                </div>
                            )}

                            {reportType === 'file' && (
                                <div className="space-y-2">
                                    <Label htmlFor="file">File</Label>
                                    <Input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                </div>
                            )}

                            <Button type="submit" className="w-full text-lg mt-4">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default NewReport;
