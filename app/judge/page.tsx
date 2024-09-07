import '../admin/admin.css';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers';
import Welcome from './components/welcome';
import Menu from './components/sidebar';
import { getAuthSession } from '@/lib/auth';
import { SheetTrigger, Sheet, SheetContent } from '@/components/ui/sheet';
import { LogOut, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SignOut from '../admin/components/SignOut';

const getData = async () => {
    const authorization = headers().get('authorization');
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/judges/settings`, {
        method: 'POST',
        cache: 'no-store',
        headers: headersInit,
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const Judges = async () => {
    const settings = await getData();
    const session = await getAuthSession();
    const userSession = session?.user;

    return (
        <div className="flex bg-body-light w-full dark:bg-dark-body">
            <Menu />
            <div className="w-full xl:pl-[300px] ">
                <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                    <div className="grid grid-cols-12 gap-x-4">
                        <div className="card col-span-full flex-center flex items-center justify-center xl:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <button
                                        type="button"
                                        id="app-menu-hamburger"
                                        className="menu-hamburger"
                                    >
                                        <MenuIcon />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side={'top'}>
                                    <SignOut />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Welcome
                            settings={settings.data.settings}
                            status={settings.data.votingStatus}
                            user={userSession}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Judges;
