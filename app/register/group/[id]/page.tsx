import '../../../styles/new.css';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { headers } from 'next/headers';
import RegistrationSingleGroupForm from '../../components/group';


const RegistrationGroupSingle = async ({ params }: { params: { id: number } }) => {
    const id = params.id;
    let data;
    try {
        const authorization = headers().get('authorization');
        const headersInit: HeadersInit = authorization ? { authorization } : {};
        const response = await fetch(`${apiUrl}/api/register/group`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            cache: 'no-store',
            headers: headersInit,
        });
        const responseData = await response.json();
        data = responseData.data;
    } catch (error) {
        console.error('Error:', error);
    }
    const { group, settings } = data;
    // console.log(contestant)

    return (
        <>
            <div className="main-container">
                <Header />
                <main id="main">
                    <div id="page-title">
                        <h1>
                            <span>Register - {group.name}</span>
                        </h1>
                    </div>
                    <div id="page-container">
                        <RegistrationSingleGroupForm group={group} settings={settings} />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default RegistrationGroupSingle;
