'use client';

import { IuserSession } from '@/app/types/user_session';
import Menu from './sidebar';
import Main from './main';
import { useState } from 'react';

type Props = {
    data: {
        id: number;
        name: string;
        status: boolean;
        qualifiers: number;
        users: IuserSession[];
    };
};

const ClientWrapper = (props: Props) => {
    const { data } = props;

    const [selectedContestantId, setSelectedContestantId] = useState('');

    const handleContestantSelect = (id: any) => {
        setSelectedContestantId(id);
    };

    return (
        <div className="flex bg-body-light w-full dark:bg-dark-body">
            <Menu data={data} onContestantSelect={handleContestantSelect} />
            <div className="w-full xl:pl-[300px] ">
                <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                    <div className="grid grid-cols-12 gap-x-4">
                        <Main data={data} id={selectedContestantId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientWrapper;
