import SignOut from '@/app/admin/components/SignOut';
import {
    Gavel,
    ListCheck,
    LogOut,
    MenuSquareIcon,
    Settings,
    UserRoundCogIcon,
    UserRoundIcon,
    File,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const NavMenu = (props: Props) => {
    return (
        <div>
            <div className="px-4 h-header flex items-center shrink-0 group-data-[sidebar-size=sm]:px-2 group-data-[sidebar-size=sm]:justify-center">
                <a
                    href="/admin"
                    className="group-data-[sidebar-size=lg]:hidden block"
                >
                    <Image
                        width={120}
                        height={40}
                        src="/images/logo.png"
                        alt="logo"
                    />
                </a>
            </div>
            <div
                id="app-menu-scrollbar"
                data-scrollbar
                className="pl-4 group-data-[sidebar-size=sm]:pl-0 text-center group-data-[sidebar-size=sm]:!overflow-visible !overflow-x-hidden smooth-scrollbar"
            >
                <div className="group-data-[sidebar-size=lg]:max-h-full">
                    <ul
                        id="navbar-nav"
                        className="text-[14px] !leading-none space-y-1 group-data-[sidebar-size=sm]:space-y-2.5 group-data-[sidebar-size=sm]:flex group-data-[sidebar-size=sm]:flex-col group-data-[sidebar-size=sm]:items-start group-data-[sidebar-size=sm]:mx-2 group-data-[sidebar-size=sm]:overflow-visible"
                    >
                        <li className="relative group/sm w-full  group-data-[sidebar-size=sm]:flex-center rounded-lg">
                            <Link
                                href="/executive"
                                className="top-layer rounded-l-3xl relative text-gray-500 dark:text-dark-text-two font-medium leading-none px-3.5 py-3 h-[42px] flex items-center group/menu-link ac-transition peer/dp-btn group-data-[sidebar-size=sm]:bg-gray-100 dark:group-data-[sidebar-size=sm]:bg-dark-icon group-data-[sidebar-size=sm]:hover:bg-primary-500/95 group-data-[sidebar-size=sm]:[&.active]:bg-primary-500/95 hover:text-white [&.active]:text-white hover:!bg-primary-500/95 [&.active]:bg-primary-500/95 group-data-[sidebar-size=sm]:rounded-lg group-data-[sidebar-size=sm]:group-hover/sm:!rounded-br-none group-data-[sidebar-size=lg]:rounded-l-full group-data-[sidebar-size=sm]:p-3 group-data-[sidebar-size=sm]:w-full"
                            >
                                <span className="shrink-0  group-data-[sidebar-size=sm]:flex-center">
                                    <MenuSquareIcon size={25} />
                                </span>
                                <span className="leading-none pl-3 group-data-[sidebar-size=sm]:pl-0 group-data-[sidebar-size=sm]:sr-only">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="relative group/sm w-full  group-data-[sidebar-size=sm]:flex-center rounded-lg">
                            <Link
                                href="/executive/contestants"
                                className="top-layer rounded-l-3xl relative text-gray-500 dark:text-dark-text-two font-medium leading-none px-3.5 py-3 h-[42px] flex items-center group/menu-link ac-transition peer/dp-btn group-data-[sidebar-size=sm]:bg-gray-100 dark:group-data-[sidebar-size=sm]:bg-dark-icon group-data-[sidebar-size=sm]:hover:bg-primary-500/95 group-data-[sidebar-size=sm]:[&.active]:bg-primary-500/95 hover:text-white [&.active]:text-white hover:!bg-primary-500/95 [&.active]:bg-primary-500/95 group-data-[sidebar-size=sm]:rounded-lg group-data-[sidebar-size=sm]:group-hover/sm:!rounded-br-none group-data-[sidebar-size=lg]:rounded-l-full group-data-[sidebar-size=sm]:p-3 group-data-[sidebar-size=sm]:w-full"
                            >
                                <span className="shrink-0  group-data-[sidebar-size=sm]:flex-center">
                                    <UserRoundIcon size={25} />
                                </span>
                                <span className="leading-none pl-3 group-data-[sidebar-size=sm]:pl-0 group-data-[sidebar-size=sm]:sr-only">
                                    All contestants
                                </span>
                            </Link>
                        </li>
                        <li className="relative group/sm w-full  group-data-[sidebar-size=sm]:flex-center rounded-lg">
                            <Link
                                href="/executive/reports"
                                className="top-layer rounded-l-3xl relative text-gray-500 dark:text-dark-text-two font-medium leading-none px-3.5 py-3 h-[42px] flex items-center group/menu-link ac-transition peer/dp-btn group-data-[sidebar-size=sm]:bg-gray-100 dark:group-data-[sidebar-size=sm]:bg-dark-icon group-data-[sidebar-size=sm]:hover:bg-primary-500/95 group-data-[sidebar-size=sm]:[&.active]:bg-primary-500/95 hover:text-white [&.active]:text-white hover:!bg-primary-500/95 [&.active]:bg-primary-500/95 group-data-[sidebar-size=sm]:rounded-lg group-data-[sidebar-size=sm]:group-hover/sm:!rounded-br-none group-data-[sidebar-size=lg]:rounded-l-full group-data-[sidebar-size=sm]:p-3 group-data-[sidebar-size=sm]:w-full"
                            >
                                <span className="shrink-0  group-data-[sidebar-size=sm]:flex-center">
                                    <File size={25} />
                                </span>
                                <span className="leading-none pl-3 group-data-[sidebar-size=sm]:pl-0 group-data-[sidebar-size=sm]:sr-only">
                                    Reports
                                </span>
                            </Link>
                        </li>
                        <li className="relative group/sm w-full  group-data-[sidebar-size=sm]:flex-center rounded-lg">
                            <Link
                                href="/executive/settings"
                                className="top-layer rounded-l-3xl relative text-gray-500 dark:text-dark-text-two font-medium leading-none px-3.5 py-3 h-[42px] flex items-center group/menu-link ac-transition peer/dp-btn group-data-[sidebar-size=sm]:bg-gray-100 dark:group-data-[sidebar-size=sm]:bg-dark-icon group-data-[sidebar-size=sm]:hover:bg-primary-500/95 group-data-[sidebar-size=sm]:[&.active]:bg-primary-500/95 hover:text-white [&.active]:text-white hover:!bg-primary-500/95 [&.active]:bg-primary-500/95 group-data-[sidebar-size=sm]:rounded-lg group-data-[sidebar-size=sm]:group-hover/sm:!rounded-br-none group-data-[sidebar-size=lg]:rounded-l-full group-data-[sidebar-size=sm]:p-3 group-data-[sidebar-size=sm]:w-full"
                            >
                                <span className="shrink-0  group-data-[sidebar-size=sm]:flex-center">
                                    <Settings size={25} />
                                </span>
                                <span className="leading-none pl-3 group-data-[sidebar-size=sm]:pl-0 group-data-[sidebar-size=sm]:sr-only">
                                    Settings
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-auto px-7 py-6 absolute -left-1 bottom-0 w-[100%] group-data-[sidebar-size=sm]:px-2">
                    <SignOut />
                </div>
            </div>
        </div>
    );
};

export default NavMenu;
