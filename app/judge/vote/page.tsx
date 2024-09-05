import '../../admin/admin.css'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import Menu from './components/sidebar';
import { getAuthSession } from '@/lib/auth';
import Main from './components/main';


const getData = async () => {
    const authorization = headers().get('authorization')
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/judges/fetch`,
        {
            method: 'POST',
            cache: 'no-store',
            headers: headersInit
        })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

const Judges = async () => {
    const fetch = await getData()
    const session = await getAuthSession()
    const userSession = session?.user
    console.log(fetch.data)

    return (
        <div className='flex bg-body-light w-full dark:bg-dark-body'>
            <Menu />
            <div className='w-full xl:pl-[300px] '>
                <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                    <div className="grid grid-cols-12 gap-x-4">
                        <Main data={fetch.data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Judges