import '../admin.css';
import Header from '../components/header';
import Menu from '../components/menu';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { getAuthSession } from '@/lib/auth';
import Form from './components/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JudgeSettings from './components/judgeSettings';
import prisma from '@/lib/db';
import { errorHandler } from '@/lib/functions';

const Settings = async () => {
    const session = await getAuthSession();
    const userSession = session?.user;

    let settings;
    try {
        settings = await prisma.settings.findFirst();
        if (!settings) {
            errorHandler('No settings found', 404);
        }
    } catch (error) {
        errorHandler(`Something went wrong: ${error}`);
    }

    return (
        <>
            <div className="flex bg-body-light w-full dark:bg-dark-body">
                <Menu />
                <div className="w-full xl:pl-[300px] ">
                    <Header session={userSession} />
                    <div className="main-content group-data-[sidebar-size=lg]:xl:ml-[52px] group-data-[sidebar-size=sm]:xl:ml-[32px] px-4 ac-transition">
                        <div className="card">
                            <h2 className="card-title">Profile Settings</h2>
                        </div>
                        <div className="grid grid-cols-12">
                            <Tabs
                                defaultValue="voting"
                                className="col-span-full"
                            >
                                <TabsList>
                                    <TabsTrigger value="voting">
                                        Voting
                                    </TabsTrigger>
                                    <TabsTrigger value="password">
                                        Password
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="voting">
                                    <div className="col-span-full">
                                        <JudgeSettings
                                            status={settings?.status}
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="password">
                                    <div className="col-span-full">
                                        <Form />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
