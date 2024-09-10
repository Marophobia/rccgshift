import React from 'react';
import { MoveRight } from 'lucide-react';
import { Iround } from '@/app/types/round';
import Link from 'next/link';

type Props = {
    settings: {
        id: number;
        current_round: number;
        status: boolean;
        round: Iround;
    };
    user:
        | {
              id: number | string;
              name: string;
              email: string;
              role: string;
          }
        | undefined;
    status: string;
};

const Welcome = (props: Props) => {
    const { settings, user, status } = props;
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    const today = new Date().toLocaleDateString('en-GB', options);

    const votepage = settings.round.id > 3 ? '/judge/finals' : '/judge/vote';

    return (
        <>
            {/* <!-- Start Intro --> */}
            <div className="col-span-full 2xl:col-span-12 card p-0">
                <div className="grid grid-cols-12 px-5 sm:px-12 py-11 relative overflow-hidden h-full">
                    <div className="col-span-full md:col-span-7 self-center inline-flex flex-col 2xl:block">
                        <p className="!leading-none text-sm lg:text-base text-gray-900 dark:text-dark-text">
                            Today is <span className="today">{today}</span>
                        </p>
                        <h1 className="text-4xl xl:text-[42px] leading-[1.23] font-semibold mt-3">
                            <span className="flex-center justify-start">
                                <span className="shrink-0">
                                    Welcome, {user?.name}
                                </span>
                                <span className="select-none hidden md:inline-block animate-hand-wave origin-[70%_70%]">
                                    👋
                                </span>
                            </span>
                            {settings.round.name}
                        </h1>
                        {status === 'Finished' ? (
                            <div className="btn b-solid btn-primary-solid btn-lg mt-6">
                                Voting Ended! Thanks!
                            </div>
                        ) : (
                            <Link
                                href={votepage}
                                className="btn b-solid btn-primary-solid btn-lg mt-6"
                            >
                                <MoveRight />
                                Start Voting
                            </Link>
                        )}
                    </div>
                    <div className="col-span-full md:col-span-5 flex-col items-center justify-center 2xl:block hidden md:flex">
                        <img
                            src="/images/loti/loti-admin-dashboard.svg"
                            alt="online-workshop"
                            className="group-data-[theme-mode=dark]:hidden"
                        />
                    </div>
                    {/* <!-- Graphicla Elements --> */}
                    <ul>
                        <li className="absolute -top-[30px] left-1/2 animate-spin-slow">
                            <img
                                src="/images/element/graphical-element-1.svg"
                                alt="element"
                            />
                        </li>
                        <li className="absolute -bottom-[24px] left-1/4 animate-spin-slow">
                            <img
                                src="/images/element/graphical-element-2.svg"
                                alt="element"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Welcome;
