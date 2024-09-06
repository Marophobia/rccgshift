'use client';
import { useEffect, useState } from 'react';
import { getAuthSession } from '@/lib/auth';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {};

const Navbar = (props: Props) => {
    return (
        <>
            <div>
                <div className="flex justify-between items-center py-3 px-7">
                    {/* logo */}
                    <div>
                        <Link href={'/'}>
                            <Image
                                src="/images/logo.png"
                                alt="logo"
                                width={160}
                                height={40}
                            />
                        </Link>
                    </div>

                    {/* nav menu */}
                    <div className="max-md:hidden">
                        <ul className="flex items-center space-x-8 uppercase text-black">
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center"
                                    href="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center"
                                    href="/about"
                                >
                                    About shift
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center"
                                    href="/vote"
                                >
                                    Vote
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center"
                                    href="/contest"
                                >
                                    Contest
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* auth buttons */}
                    <div className="max-md:hidden">
                        <Button variant={'secondary'} className="hover:">
                            <Link href="/register" className="text-[#CC3300]">
                                {' '}
                                Click To Register
                            </Link>
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <Menu size={24} />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        RCCG International Shift Talent Hunt
                                    </SheetTitle>
                                </SheetHeader>
                                <ul className="space-y-4 pt-6">
                                    <li className="w-full">
                                        <Link className="w-full" href="/">
                                            <div className="w-full hover:bg-gray-100 text-blue-400 p-1 rounded-sm">
                                                Home
                                            </div>
                                        </Link>
                                    </li>
                                    <Separator />
                                    <li className="w-full">
                                        <Link className="w-full" href="/about">
                                            <div className="w-full hover:bg-gray-100 p-1 rounded-sm">
                                                About shift
                                            </div>
                                        </Link>
                                    </li>
                                    <Separator />
                                    <li className="w-full">
                                        <Link className="w-full" href="/vote">
                                            <div className="w-full hover:bg-gray-100 p-1 rounded-sm">
                                                Vote
                                            </div>
                                        </Link>
                                    </li>
                                    <Separator />
                                    <li className="w-full">
                                        <Link
                                            className="w-full"
                                            href="/contest"
                                        >
                                            <div className="w-full hover:bg-gray-100 p-1 rounded-sm">
                                                Contest
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
