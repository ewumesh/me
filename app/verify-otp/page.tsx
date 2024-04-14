"use client";

import { API_URL } from "@/constants";
import { useEffect, useState } from "react";

export default function Login() {
    const [firstDigit, setFirstDigit] = useState('');
    const [secondDigit, setSecondDigit] = useState('');
    const [thirdDigit, setThirdDigit] = useState('');
    const [fourthDigit, setFourthDigit] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [resend, setResend] = useState(false);
    const [resposeError, setResponseError] = useState(null);
    const [newOTPMessage, setNewOTPMessage] = useState('');

    const [userDetails, setUserDetails] = useState<any>(null);

    const handleFirstDigit = (event: any) => {
        setFirstDigit(event.target.value);
    };

    const handleSecondDigit = (event: any) => {
        setSecondDigit(event.target.value);
    };

    const handleThirdDigit = (event: any) => {
        setThirdDigit(event.target.value);
    };

    const handleFourthDigit = (event: any) => {
        setFourthDigit(event.target.value);
    };

    const handleResendOTP = async(event:any) => {
        setResend(true);
        const formData = new FormData();
        let userEmail = JSON.parse(localStorage.getItem('userEmail') || '{}');
        formData.append("email", userEmail);

        try {
            const response = await fetch(`${API_URL.url}/api/user/resend-otp`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setResend(false);
                setResponseError(null);
                setNewOTPMessage('New OTP was sent to your mail.')
            } else {
                setResend(false)
            }
        } catch (error: any) {
            setResend(false);
            console.error("Error", error.error);
        }
    }

    const handleVerify = async (event: any) => {
        setIsLoading(true);

        let otp = firstDigit.toString()+secondDigit.toString()+thirdDigit.toString()+fourthDigit.toString();
        const formData = new FormData();
        let userEmail = JSON.parse(localStorage.getItem('userEmail') || '{}');
        formData.append("email", userEmail);
        formData.append("otp", otp);

        try {
            const response = await fetch(`${API_URL.url}/api/user/verify`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = '/';
                setResponseError(null);
                setNewOTPMessage('')
            } else {
                setIsLoading(false);
                const error = await response.json();
                setResponseError(error.message);
                setNewOTPMessage('');
            }
        } catch (error: any) {
            setIsLoading(false);
            setNewOTPMessage('');
            console.error("Error", error.error);
        }
    };

    useEffect(() => {

        let userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    setUserDetails(userDetails);

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

                            <form autoFocus={false} autoComplete="off" className="p-10">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Verify</h1>
                                </div>
                                {resposeError && (
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {resposeError}
                                </div>
                                )}

{newOTPMessage && (
<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  {newOTPMessage}
</div>
)}
                                
                                <div className="py-10">
                                <label className="block text-md text-white mb-2" >Enter OTP</label>
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        <div className="w-20 h-10 mx-1">
                                            <input onChange={handleFirstDigit} value={firstDigit} className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700 text-black" type="text" name="" id="" />
                                        </div>
                                        <div className="w-20 h-10 mx-1">
                                            <input onChange={handleSecondDigit} value={secondDigit} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                        </div>
                                        <div className="w-20 h-10 mx-1">
                                            <input onChange={handleThirdDigit} value={thirdDigit} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                        </div>
                                        <div className="w-20 h-10 mx-1">
                                            <input onChange={handleFourthDigit} value={fourthDigit} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                        </div>
                                    </div>

                                    {userDetails && (
                                    <a href="/" className="flex flex-row items-center text-blue-600">Verify Later</a>
                                    )}

                                    <div className="flex flex-col py-20">
                                        <div>
                                            <button disabled={isLoading} onClick={handleVerify} type="button" className="text-center w-full bg-purple rounded outline text-white text-sm shadow-sm p-2">
                                            {isLoading && (
                                            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        )}
                                                {isLoading ? 'Verifying':'Verify'}
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p> <a href="Javascript:;" className="flex flex-row items-center text-blue-600" onClick={handleResendOTP} target="_blank">Resend</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}