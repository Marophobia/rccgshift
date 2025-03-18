"use client"
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IOfficials } from '@/app/types/officials';

type Props = {
    session:
    | {
        name: string;
        email: string;
        id: string | number;
        role: string;
    }
    | undefined,
    official: IOfficials
};

const Hero = (props: Props) => {
    const { session, official } = props;
    const router = useRouter();

    return (
        <>
            {/* <!-- Start Intro --> */}
            <div className="col-span-full 2xl:col-span-7 card p-0">
                <div className="grid grid-cols-12 px-5 sm:px-12 py-11 relative overflow-hidden h-full">
                    <div className="col-span-full md:col-span-7 self-center inline-flex flex-col 2xl:block">
                        <p className="!leading-none text-sm lg:text-base text-gray-900 dark:text-dark-text"> <span className="today">{official.official_sessions[0].position}, {official.official_sessions[0].department.name}</span>
                        </p>
                        <h1 className="text-4xl xl:text-[42px] leading-[1.23] font-semibold mt-3">
                            <span className="flex-center justify-start">
                                <span className="shrink-0">Welcome Back.</span>
                                <span
                                    className="select-none hidden md:inline-block animate-hand-wave origin-[70%_70%]">👋</span>
                            </span>
                            {session?.name}
                        </h1>
                        <Link href="/admin/reports" className="btn b-solid btn-primary-solid btn-lg mt-6">
                            <MoveRight />
                            Submit Meeting Minutes
                        </Link>
                    </div>
                    <div
                        className="col-span-full md:col-span-5 flex-col items-center justify-center 2xl:block hidden md:flex">
                        <img src="/images/loti/loti-admin-dashboard.svg" alt="online-workshop"
                            className="group-data-[theme-mode=dark]:hidden" />
                    </div>
                    {/* <!-- Graphicla Elements --> */}
                    <ul>
                        <li className="absolute -top-[30px] left-1/2 animate-spin-slow">
                            <img src="/images/element/graphical-element-1.svg" alt="element" />
                        </li>
                        <li className="absolute -bottom-[24px] left-1/4 animate-spin-slow">
                            <img src="/images/element/graphical-element-2.svg" alt="element" />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Hero