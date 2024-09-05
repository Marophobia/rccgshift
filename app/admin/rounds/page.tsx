import '../admin.css'
import Header from "../components/header"
import Menu from "../components/menu"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import { getAuthSession } from '@/lib/auth';
import RoundsCard from './components/rounds';


const getData = async () => {

    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/admin/rounds`,
        {
            method: 'POST',
            cache: 'no-store',
        })
    const res2 = await fetch(`${apiUrl}/api/admin/settings`,
        {
            method: 'POST',
            cache: 'no-store',
            headers: headersInit
        })
    if (!res.ok || !res2.ok) {
        throw new Error('Failed to fetch data')
    }

    return { rounds: await res.json(), settings: await res2.json() }
}

const Rounds = async () => {
    const session = await getAuthSession()
    const userSession = session?.user
    const { rounds, settings } = await getData()


    return (
        <>
            <div className='flex bg-body-light w-full dark:bg-dark-body'>
                <Menu />
                <div className='w-full xl:pl-[300px] '>
                    <Header session={userSession} />
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="card">
                            <h2 className="card-title">All Rounds</h2>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-full">
                                <RoundsCard rounds={rounds.data} settings={settings.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rounds