'use client';
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
import { Menu, Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { Separator } from './ui/separator';


type Props = {};

const Navbar = (props: Props) => {
    const currentDate = new Date().toLocaleDateString(); // Get current date
    return (
        <>
            <div>
                <div className="container-fluid d-none d-lg-block" style={{ backgroundColor: '#151515' }}>
                    <div className="row py-2 px-lg-5">
                        <div className="col-lg-6 text-left mb-2 mb-lg-0">
                            <div className="d-inline-flex align-items-center">
                                <small style={{ color: '#FFFFCC' }} className='flex gap-1'>
                                    <Phone style={{ color: '#FFFFCC' }} size={10} className='mt-1' />
                                    +447424483987
                                </small>
                                <small className="px-3" style={{ color: '#676767' }}>|</small>
                                <small style={{ color: '#FFFFCC' }} className='flex gap-1'>
                                    <Mail style={{ color: '#FFFFCC' }} size={10} className='mt-1' />
                                    info@rccgshift.org
                                </small>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <div className="d-inline-flex align-items-center">
                                <p className="text-primary px-2">
                                    <i style={{ color: '#FFFFCC', fontSize: '14px' }}>{currentDate}</i>
                                </p>
                                <small className="px-3" style={{ color: '#676767' }}>|</small>
                                <a
                                    className="text-primary px-2"
                                    href="https://www.facebook.com/profile.php?id=61551057372506&mibextid=ibOpuV"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook style={{ color: '#FFFFCC' }} size={17} />
                                </a>
                                <a
                                    className="text-primary px-2"
                                    href="https://www.instagram.com/rccgshift?igsh=MTFtbWRybHRuNHp6dQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram style={{ color: '#FFFFCC' }} size={17} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 px-7 bg-black">
                    {/* logo */}
                    <div>
                        <Link href={'/'}>
                            <Image
                                src="/images/logo-white.png"
                                alt="logo"
                                width={160}
                                height={40}
                            />
                        </Link>
                    </div>

                    {/* nav menu */}
                    <div className="max-md:hidden">
                        <ul className="flex items-center space-x-8 uppercase text-white">
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center text-white"
                                    href="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center text-white"
                                    href="/about"
                                >
                                    About shift
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center text-white"
                                    href="/vote"
                                >
                                    Vote
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center text-white"
                                    href="/contestants"
                                >
                                    Contestants
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-[#CC3300] font-bold text-md text-center text-white"
                                    href="/results"
                                >
                                    Results
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* auth buttons */}
                    <div className="max-md:hidden">
                        <Button style={{ background: "#FF0034" }} className="hover:">
                            <Link href="/register" className='text-white'>
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
                                            href="/contestants"
                                        >
                                            <div className="w-full hover:bg-gray-100 p-1 rounded-sm">
                                                Contestants
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            className="w-full"
                                            href="/results"
                                        >
                                            <div className="w-full hover:bg-gray-100 p-1 rounded-sm">
                                                Results
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
