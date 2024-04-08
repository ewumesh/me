"use client";

import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Login() {
    // const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                window.location.href = '/';
            } else {
                setIsLoading(false);
                console.error("Failed to Login:", response.statusText);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error);
        }
    };

    useEffect(() => {

    }, []);

    const inlineStyles = {
        backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
    };

    return (
        <section className="top-20">
            <div className="top-20 min-h-screen bg-no-repeat bg-cover bg-center"
                style={inlineStyles}>
                <div className="flex justify-end">
                    <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
                        <div>

                            <form autoFocus={false} autoComplete="off">
                                <div>
                                    <span className="text-sm text-gray-900">Welcome back</span>
                                    <h1 className="text-2xl font-bold">Login to your account</h1>
                                </div>
                                <div className="my-3">
                                    <label className="block text-md mb-2" >Email</label>
                                    <input value={email} onChange={handleEmailChange} className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="Email" />
                                </div>
                                <div className="mt-5">
                                    <label className="block text-md mb-2">Password</label>
                                    <input value={password} onChange={handlePasswordChange} className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="Password" />
                                </div>

                                <div className="flex justify-between">
                                    <div>

                                    </div>
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                                </div>
                                <div>
                                    <button onClick={handleLogin} type="button" className="mt-4 mb-3 w-full bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-md transition duration-100">Login now</button>
                                    {/* <div className="flex  space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">

                                        <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="" />
                                        <button >Or sign-in with google</button>
                                    </div> */}
                                </div>
                            </form>
                            <p className="mt-8"> Dont have an account? <span className="cursor-pointer text-sm text-blue-600"> Join free today</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}