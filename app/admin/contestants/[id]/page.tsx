import '../../admin.css'
import Header from "../../components/header"
import Menu from "../../components/menu"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import { getAuthSession } from '@/lib/auth';
import ContestantSingle from '../components/contestant';


const Contestant = async ({ params }: { params: { id: number } }) => {
    const session = await getAuthSession()
    const userSession = session?.user
    const id = params.id
    let contestant
    try {
        const authorization = headers().get('authorization')
        const headersInit: HeadersInit = authorization ? { authorization } : {};
        const response = await fetch(`${apiUrl}/api/admin/contestants/single`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData = await response.json();
        contestant = responseData.data

    } catch (error) {
        console.error('Error:', error);
    }

    return (
        <>
            <div className='flex bg-body-light w-full dark:bg-dark-body'>
                <Menu />
                <div className='w-full xl:pl-[300px] '>
                    <Header session={userSession} />

                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <ContestantSingle contestant={contestant} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contestant