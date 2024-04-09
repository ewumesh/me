"use client";

import Link from "next/link";
import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";
import Image from 'next/image';
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    setUserDetails(userDetails);
  }, []);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <Link
          href="/"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/logo3.png"
            alt="Logo"
            width={80}
            height={80}
            draggable={false}
            className="cursor-pointer hover:animate-slowspin"
          />
          {/* <div className="font-bold ml-[10px] hidden md:block text-gray-300">
            ewumesh
          </div> */}
        </Link>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

            {/* source code */}
            {/* <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Source Code
            </Link> */}
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {/* {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))} */}

          {!userDetails && (
            <Link
              className="text-white"
              href={'/login'}
            >
              Login
            </Link>
          )}

          {userDetails && (
            <div>
              <Link href={'/profile'}>
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{userDetails?.user?.name?.slice(0, 1) || ''}</span> 
              </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
