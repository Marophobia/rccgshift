
import { getAuthSession } from '@/lib/auth';
import Header from './components/header';
import Menu from './components/menu';
import '../admin/admin.css';
import Stats from '@/app/admin/components/stats';
import Hero from './components/hero';
import Contestants from '@/app/admin/components/contestant';
import Latest from '@/app/admin/components/latest';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers';

type Props = {};

const getData = async () => {
    const authorization = headers().get('authorization');
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/admin/contestants`, {
        method: 'POST',
        cache: 'no-store',
        headers: headersInit,
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const getOfficial = async () => {
    const session = await getAuthSession();
    const authorization = headers().get('authorization');
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/officials/single`, {
        method: 'POST',
        cache: 'no-store',
        headers: headersInit,
        body: JSON.stringify({ id: session?.user.id }),
    });
    return res.json();
}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession();
    const userSession = session?.user;
    // console.log(userSession)
    const contestants = await getData();
    const official = await getOfficial();

    return (
        <>
            <div className="flex bg-body-light w-full dark:bg-dark-body">
                <Menu />
                <div className="w-full xl:pl-[300px] ">
                    <Header session={userSession} />
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="grid grid-cols-12 gap-x-4">
                            <Hero session={userSession} official={official.data} />
                            <Stats contestants={contestants.data.length} />
                            <Contestants contestants={contestants.data} />
                            <Latest contestants={contestants.data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
