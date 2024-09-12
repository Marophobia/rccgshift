'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getSession, signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    // Step 2: Handle form submission
    const login = async (event: any) => {
        event.preventDefault();

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
                expires: checked,
            });

            if (result?.error) {
                toast.dismiss();
                toast.error(result.error);
            } else {
                toast.dismiss();
                const session = await getSession();
                console.log();

                if (session?.user?.role === 'admin') {
                    router.push('/admin');
                    router.refresh();
                } else {
                    router.push('/judge');
                    router.refresh();
                }
            }
        } catch (error: any) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="main-content m-4">
                <div className="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)]">
                    {/* Start Overview Area */}
                    <div className="col-span-full lg:col-span-6">
                        <div className="flex flex-col items-center justify-center gap-10 text-center">
                            <div className="hidden sm:block">
                                <img
                                    src="./images/loti/loti-auth.svg"
                                    alt="loti"
                                    className="group-data-[theme-mode=dark]:hidden"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
                                    Welcome back!
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* End Overview Area */}

                    {/* Start Form Area */}
                    <div className="col-span-full lg:col-span-6 w-full lg:max-w-[600px]">
                        <div className="border border-form dark:border-dark-border p-5 md:p-10 rounded-20 md:rounded-30">
                            <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
                                Sign In
                            </h3>
                            <p className="font-medium text-gray-500 dark:text-dark-text mt-4">
                                Welcome Back! Log in to your account
                            </p>
                            <form className="leading-none mt-8">
                                <div className="mb-2.5">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="example@rccgshift.org"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="form-input px-4 py-3.5 rounded-lg"
                                    />
                                </div>
                                <div className="mt-5">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            className="form-input px-4 py-3.5 rounded-lg"
                                        />
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn b-solid btn-primary-solid w-full mt-5"
                                    onClick={login}
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* End Form Area */}
                </div>
            </div>
        </>
    );
};

export default LoginForm;
