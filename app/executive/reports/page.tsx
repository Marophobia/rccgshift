import '../../admin/admin.css'
import Header from "../components/header"
import Menu from "../components/menu"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import { getAuthSession } from '@/lib/auth';
import NewReport from "./components/new";
import Reports from "./components/reports";


const getReports = async () => {
    const session = await getAuthSession()
    const authorization = headers().get('authorization');
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/officials/reports`, {
        method: 'POST',
        cache: 'no-store',
        headers: headersInit,
        body: JSON.stringify({ id: session?.user.id }),
    });
    if (!res.ok) {
        //log the error
        console.log(await res.json())
        // throw new Error('Failed to fetch data');
    }
    return res.json();
};

const Contestants = async () => {
    const session = await getAuthSession()
    const userSession = session?.user
    const reports = await getReports()

    return (
        <>
            <div className='flex bg-body-light w-full dark:bg-dark-body'>
                <Menu />
                <div className='w-full xl:pl-[300px] '>
                    <Header session={userSession} />
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="card">
                            <h2 className="card-title">Reports</h2>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-full">
                                <NewReport session={userSession} />
                                <Reports reports={reports.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contestants