'use client';
import Link from 'next/link';
import { IReports } from '@/app/types/officials';

type Props = {
    reports: IReports[];
};

const MyReports = (props: Props) => {
    const { reports } = props;

    return (
        <>
            <div className="col-span-full 2xl:col-span-4 card">
                <div className="flex-center-between">
                    <h6 className="card-title">My Reports</h6>
                </div>
                {/* Course Table */}
                <div className="overflow-x-auto scrollbar-table">
                    <table className="table-auto w-full whitespace-nowrap text-left text-xs text-gray-500 dark:text-dark-text font-semibold leading-none">
                        <thead className="border-b border-dashed border-gray-900/60 dark:border-dark-border-three">
                            <tr>
                                <th className="px-3.5 py-4">Name</th>
                                <th className="px-3.5 py-4">Author</th>
                                <th className="px-3.5 py-4">Downloadable File</th>
                                <th className="px-3.5 py-4">Date</th>
                                <th className="px-3.5 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-gray-900/60 dark:divide-dark-border-three">
                            {reports.length > 0 ? (
                                reports.map((report) => (
                                    <tr key={report.id}>
                                        <td className="flex items-center gap-2 px-3.5 py-4">
                                        <div>
                                            <h6 className="text-heading font-semibold mb-1.5 line-clamp-1">
                                                {report.name}
                                            </h6>
                                        </div>
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {report.author.name}
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {report.file ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {new Date(report.date).toLocaleString()}
                                    </td>
                                    <td className="px-3.5 py-4">
                                        <Link href={`/reports/${report.id}`} className="btn b-solid btn-primary-solid btn-sm">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">No reports found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyReports;
