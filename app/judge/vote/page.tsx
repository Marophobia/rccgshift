import '../../admin/admin.css';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers';
import { getAuthSession } from '@/lib/auth';
import Main from './components/main';

const getData = async () => {
    const authorization = headers().get('authorization');
    const headersInit: HeadersInit = authorization ? { authorization } : {};
    const res = await fetch(`${apiUrl}/api/judges/fetch`, {
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
    const fetch = await getData();
    const session = await getAuthSession();

    const id = session?.user.role.slice(5);
    if (!id) {
        throw new Error('Invalid session');
    }
    const userSession = session?.user;

    return <Main data={fetch.data} id={id} />;
};

export default Judges;
