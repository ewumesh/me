"use client";

import { API_URL } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Profile() {
    const [userDetails, setUserDetails] = useState<any>({});

    const getUserDetails = async () => {
        let user = JSON.parse(localStorage.getItem('userDetails') || '');
        if(user) {
            if (!user?.user?._id) return;
            try {
                const res = await axios.get(`${API_URL.url}/api/user/${user?.user?._id}`);
                if (res?.data?.title) {
                    // metadata.title = res?.data?.title;
                }
                setUserDetails(res.data);
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            }
        }
    }

    const handleLogOut = () => {
        localStorage.setItem('userDetails', JSON.stringify(''));
        window.location.href = '/';
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="p-16">
        <div className="p-8 backdrop-blur-md shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">0</p>
                <p className="text-gray-400">Connections</p>
              </div>
              <div>
                   <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Blogs</p>
              </div>
                  <div>
                   <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">View</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
              </div>
            </div>
        
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        <button
          className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
        >
          Connect
        </button>
            <button onClick={handleLogOut}
          className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
        >
          Logout
        </button>
            </div>
          </div>
        
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{userDetails?.name} <span className="font-light text-gray-500">24</span></h1>
            <p className="font-light text-gray-600 mt-3">-</p>
        
            <p className="mt-8 text-gray-500">-</p>
            <p className="mt-2 text-gray-500">-</p>
          </div>
        
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">-</p>
            <button
          className="text-indigo-500 py-2 px-4  font-medium mt-4"
        >
         
        </button>
          </div>
        
        </div>
        </div>    
    )
} 