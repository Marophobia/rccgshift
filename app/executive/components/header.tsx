'use client';
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';
import {
    ChevronDown,
    MenuIcon,
    Search,
    Settings,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavMenu from './navMenu';

type Props = {
    session:
    | {
        name: string;
        email: string;
        id: string | number;
        role: string;
    }
    | undefined;
};

const Header = (props: Props) => {
    const { session } = props;
    return (
        <>
            <ToastContainer />
            <header className="header px-4 sm:px-6 h-fit w-full sm:h-header bg-white dark:bg-dark-card rounded-none xl:rounded-15 flex items-center mb-4 xl:m-4 group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] ac-transition">
                <div className="flex-center-between grow">
                    {/* <!-- Header Left --> */}
                    <div className="flex items-center gap-4">
                        <div className="menu-hamburger-container flex-center flex items-center justify-center xl:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <div
                                        id="app-menu-hamburger"
                                        className="menu-hamburger"
                                    >
                                        <MenuIcon />
                                    </div>
                                </SheetTrigger>
                                <SheetContent side={'left'}>
                                    <NavMenu />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="w-56 md:w-72 leading-none text-sm relative text-gray-900 dark:text-dark-text hidden sm:block">
                            <span className="absolute top-1/2 -translate-y-[40%] left-3.5">
                                <Search size={20} />
                            </span>
                            <Input
                                type="text"
                                name="header-search"
                                id="header-search"
                                placeholder="Search..."
                                className="bg-transparent pl-[36px] pr-12 py-4 dk-border-one rounded-full w-full font-spline_sans focus:outline-none "
                            />
                            <span className="absolute top-1/2 -translate-y-[40%] right-4 hidden lg:flex lg:items-center lg:gap-0.5 select-none">
                                ⌘+k
                            </span>
                        </div>
                    </div>
                    {/* <!-- Header Right --> */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        {/* <!-- Settings Button --> */}
                        <button
                            type="button"
                            className="size-8 flex-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                            data-drawer-target="app-setting-drawer"
                            data-drawer-show="app-setting-drawer"
                            data-drawer-placement="right"
                            aria-controls="app-setting-drawer"
                        >
                            <Link href="/executive/settings">
                                <Settings className="animate-spin-slow w-[22px]" />
                            </Link>
                        </button>
                        {/* <!-- Notification Button --> */}

                        {/* <!-- Border --> */}
                        <div className="w-[1px] h-fit sm:h-header bg-[#EEE] dark:bg-dark-border hidden sm:block"></div>
                        {/* <!-- User Profile Button --> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="text-gray-500 flex items-center gap-2 sm:pr-4 relative after:absolute after:right-0 after:font-remix  after:hidden sm:after:block">
                                    <Image
                                        width={100}
                                        height={100}
                                        src="/images/user/profile-img.png"
                                        alt="user-img"
                                        className="size-7 sm:size-9 rounded-50"
                                    />
                                    <ChevronDown />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-white z-backdrop text-left divide-y divide-gray-100 rounded-lg shadow w-48"
                                align="end"
                            >
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-white">
                                    <div className="font-medium ">
                                        {session?.name}
                                    </div>
                                    <div className="truncate">
                                        {session?.email}
                                    </div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <Link
                                            href="/executive"
                                            className="flex font-medium px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-icon dark:hover:text-white"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/executive/settings"
                                            className="flex font-medium px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-icon dark:hover:text-white"
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                </ul>

                                <div
                                    className="py-2 flex items-center cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut().catch(console.error);
                                    }}
                                >
                                    <div className="flex w-full font-medium px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white">
                                        Sign out
                                        <DropdownMenuShortcut>
                                            ⇧⌘Q
                                        </DropdownMenuShortcut>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
