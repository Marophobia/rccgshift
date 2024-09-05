import '../../admin.css'
import Header from "../../components/header"
import Menu from "../../components/menu"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers'
import { getAuthSession } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';
import Participants from '../components/participants';

const Round = async ({ params }: { params: { id: number } }) => {
    const session = await getAuthSession()
    const userSession = session?.user
    const id = params.id
    let round
    let settings
    try {
        const authorization = headers().get('authorization')
        const headersInit: HeadersInit = authorization ? { authorization } : {};
        const response = await fetch(`${apiUrl}/api/admin/rounds/single`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData = await response.json();
        const response2 = await fetch(`${apiUrl}/api/admin/settings`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit
        });
        const responseData2 = await response2.json();
        round = responseData.data
        settings = responseData2.data
        // console.log(round)

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
                        <div className="card">
                            <div className="card-title">
                                <div className='flex gap-2'>
                                    <h2>{round.name}</h2>
                                    {round.id === settings.current_round ?
                                        (<span className="badge b-outline badge-secondary-outline">Current Round</span>) :
                                        round.users.length > 0 ? (
                                            <span className="badge b-outline badge-danger-outline">Finished</span>
                                        ) : (<span className="badge b-outline badge-primary-outline">Upcoming</span>)}

                                    {round.status ? (<span className="badge b-outline badge-secondary-outline">Voting Active</span>) : (<span className="badge b-outline badge-danger-outline">Voting Disabled</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-full">
                                <Participants id={round.id} qualifiers={round.qualifiers} participants={round.users} status={round.status} settings={settings} />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Round