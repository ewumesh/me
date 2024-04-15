"use client";

import { API_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resposeError, setResponseError] = useState(null);

    const gotoRegister = () => {
        router.push('/register')
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event: any) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch(`${API_URL.url}/api/user/login`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userDetails', JSON.stringify(data.data));
                localStorage.setItem('userEmail', JSON.stringify(email));
                if(data && data?.data?.user?.isVerified) {
                    // window.location.href = '/';
                    router.push('/')
                } else {
                    router.push('/verify-otp')
                    // window.location.href = '/verify-otp';
                }
                
                setResponseError(null);
                // redirect('/blogs')
            } else {
                setIsLoading(false);
                const error = await response.json();
                setResponseError(error.message)
            }
        } catch (error: any) {
            setIsLoading(false);
            console.error("Error", error.error);
        }
    };

    useEffect(() => {

    }, []);

    const inlineStyles = {
        backgroundImage: "url('https://images.pexels.com/photos/90764/man-studio-portrait-light-90764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    };

    return (
        <section className="top-20">
            <div className="top-20 min-h-screen bg-no-repeat bg-left"
                style={inlineStyles}>
                <div className="flex justify-end">
                    <div className=" min-h-screen w-1/2 flex justify-center items-center backdrop-blur-md">
                        <div>
                            <form autoFocus={false} autoComplete="off">
                                <div>
                                    <span className="text-sm text-white">Welcome back</span>
                                    <h1 className="text-2xl font-bold text-white">Login to your account</h1>
                                </div>
                                {resposeError && (
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {resposeError}
                                </div>
                                )}
                                
                                <div className="my-3">
                                    <label className="block text-md text-white mb-2" >Email</label>
                                    <input value={email} onChange={handleEmailChange} className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="Email" />
                                </div>
                                <div className="mt-5">
                                    <label className="block text-md text-white mb-2">Password</label>
                                    <input value={password} onChange={handlePasswordChange} className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="Password" />
                                </div>

                                <div className="flex justify-between">
                                    <div>

                                    </div>
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                                </div>
                                <div>
                                    <button disabled={isLoading} onClick={handleLogin} type="button" className="mt-4 mb-3 w-full bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-md transition duration-100">
                                        {isLoading && (
                                            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        )}

                                        {isLoading ? 'Please wait...' : 'Login now'}

                                    </button>
                                    <div className="flex  space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">

                                        <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="" />
                                        <button >Or sign-in with google</button>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-8"><span className="text-white"> Dont have an account?</span><span onClick={gotoRegister} className="cursor-pointer text-sm text-blue-600"> Join free today</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}