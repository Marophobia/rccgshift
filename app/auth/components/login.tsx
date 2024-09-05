"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getSession, signIn } from "next-auth/react"
import { Input } from '@/components/ui/input';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false)
    const router = useRouter()

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
                toast.dismiss()
                toast.error(result.error);
            } else {
                toast.dismiss()
                const session = await getSession();
                console.log();

                if (session?.user.role === 'judge') {
                    router.push('/judge')
                    router.refresh();
                } else {
                    router.push('/admin');
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
                                <img src="./images/loti/loti-auth.svg" alt="loti" className="group-data-[theme-mode=dark]:hidden" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-[28px] leading-none font-semibold text-heading">
                                    Welcome back!
                                </h3>
                                <p className="font-medium text-gray-500 dark:text-dark-text mt-4 px-[10%]">
                                    Whether you're launching a stunning online store or optimizing your object-oriented
                                </p>
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
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="debra.holt@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-input px-4 py-3.5 rounded-lg"
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="form-input px-4 py-3.5 rounded-lg"
                                        />
                                        <label
                                            htmlFor="toggleInputType"
                                            className="size-8 rounded-md flex-center hover:bg-gray-200 dark:hover:bg-dark-icon foucs:bg-gray-200 dark:foucs:bg-dark-icon position-center left-[95%]"
                                        >
                                            <input
                                                type="checkbox"
                                                id="toggleInputType"
                                                className="inputTypeToggle peer/it"
                                                hidden
                                            />
                                            <i className="ri-eye-off-line text-gray-500 dark:text-dark-text peer-checked/it:before:content-['\ecb5']"></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 mb-7">
                                    <div className="flex items-center gap-1 select-none">
                                        <input type="checkbox" checked={checked} onClick={() => setChecked(!checked)} name="remember-me" id="rememberMe" />
                                        <label htmlFor="rememberMe" className="font-spline_sans text-sm leading-none text-gray-900 dark:text-dark-text cursor-pointer">
                                            Remember Me
                                        </label>
                                    </div>
                                    <a href="forgot-password.html" className="text-xs leading-none text-primary-500 font-semibold">
                                        Forgot password?
                                    </a>
                                </div>
                                {/* Submit Button */}
                                <button type="submit" className="btn b-solid btn-primary-solid w-full" onClick={login}>
                                    Sign In
                                </button>
                            </form>
                            <div className="font-spline_sans text-gray-900 dark:text-dark-text leading-none text-center my-4">
                                OR
                            </div>
                            <div className="flex items-center flex-col xl:flex-row gap-4 2xl:gap-5">
                                <a href="#" className="btn b-outline-static btn-disable-outline w-full grow xl:w-auto">
                                    <img src="./images/icons/google.svg" alt="icon" />
                                    <span className="shrink-0">Sign in with Google</span>
                                </a>
                                <a href="#" className="btn b-outline-static btn-disable-outline w-full grow xl:w-auto">
                                    <img src="./images/icons/apple.svg" alt="icon" className="dark:brightness-[3]" />
                                    <span className="shrink-0">Continue with Apple</span>
                                </a>
                            </div>
                            <div className="text-gray-900 dark:text-dark-text font-medium leading-none mt-5">
                                Don’t have an account yet?
                                <a href="sign-up.html" className="text-primary-500 font-semibold">Sign Up</a>
                            </div>
                        </div>
                    </div>
                    {/* End Form Area */}
                </div>
            </div>
        </>
    )
}

export default LoginForm