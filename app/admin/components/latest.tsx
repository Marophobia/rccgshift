'use client';
import { useState } from 'react';
import { IuserSession } from '@/app/types/user_session';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { Icontestants } from '@/app/types/contestants';
import Image from 'next/image';

type Props = {
    contestants: Icontestants[];
};

const Latest = (props: Props) => {
    const { contestants } = props;
    const [data, setData] = useState(contestants);

    return (
        <>
            <div className="col-span-full 2xl:col-span-4 card">
                <div className="flex-center-between">
                    <h6 className="card-title">Latest Contestants</h6>
                    <Link
                        href="/admin/contestants"
                        className="btn b-solid btn-primary-solid btn-sm"
                    >
                        See all
                    </Link>
                </div>
                {/* Course Table */}
                <div className="overflow-x-auto scrollbar-table">
                    <table className="table-auto w-full whitespace-nowrap text-left text-xs text-gray-500 dark:text-dark-text font-semibold leading-none">
                        <thead className="border-b border-dashed border-gray-900/60 dark:border-dark-border-three">
                            <tr>
                                <th className="px-3.5 py-4">Name</th>
                                <th className="px-3.5 py-4">Category</th>
                                <th className="px-3.5 py-4">Region</th>
                                <th className="px-3.5 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-gray-900/60 dark:divide-dark-border-three">
                            {data.splice(0, 5).map((contestant) => (
                                <tr key={contestant.id}>
                                    <td className="flex items-center gap-2 px-3.5 py-4">
                                        <a
                                            href="#"
                                            className="size-10 rounded-50 overflow-hidden"
                                        >
                                            <Image
                                                width={40}
                                                height={40}
                                                src={`/images/contestants/${contestant.picture}`}
                                                alt="thumb"
                                            />
                                        </a>
                                        <div>
                                            <h6 className="text-heading font-semibold mb-1.5 line-clamp-1">
                                                {contestant.name}
                                            </h6>
                                        </div>
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {contestant.category}
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {contestant.region}
                                    </td>
                                    <td className="px-3.5 py-4">
                                        {contestant.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Latest;
