'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { formatDistance, subDays } from 'date-fns';
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { API_URL } from '@/constants';

function getTimeDifference(dateString: string) {
    let a = formatDistance(subDays(dateString, 3), new Date(), { addSuffix: true })
    return a;
}

function convertToSlug(inputString: string): string {
    // Convert string to lowercase
    const lowercaseString = inputString.toLowerCase();
    // Replace spaces with hyphens
    const slugString = lowercaseString.replace(/\s+/g, '-');
    return slugString;
}

function extractTextFromHTML(html: string): string {
    // Regular expression to match text within paragraph tags
    const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gs;

    // Array to store extracted text
    const extractedText: string[] = [];

    // Iterate over matches and extract text
    let match;
    while ((match = paragraphRegex.exec(html)) !== null) {
        // Extract text content from match
        const textContent = match[1].replace(/(<([^>]+)>)/gi, ''); // Remove any HTML tags within the paragraph
        extractedText.push(textContent.trim());
    }

    // Concatenate extracted text and return
    return extractedText.join('\n').slice(0, 200) + '...';
}

export const LatestBlogs = () => {
    const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

    useEffect(() => {
        const getBlogsLatest = async () => {
            try {
                const response = await fetch(`${API_URL.url}/api/blog`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setLatestBlogs(data);
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            }
        };

        getBlogsLatest();
        

    }, []);

    return (
        <section>
            {latestBlogs.length > 0 && (
                <div className="py-8 px-20">
                    {/* <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                    </div> */}
                    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Read More Learn More
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        Latest Blogs
      </motion.div>

      {/* <motion.div
        variants={slideInFromRight(0.5)}
        className=" text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        Unlocking the Secrets of Productivity.
      </motion.div> */}

      <motion.div
        variants={slideInFromRight(0.5)}
        className=" text-[20px] text-gray-500 mb-10 mt-[5px] text-center"
      >
       Unlocking the Secrets of Productivity.
      </motion.div>
    </div>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {latestBlogs.map((blog:any, index:number) => (
                            <article key={index} className="p-6  rounded-lg border border-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-5 text-gray-500">
                                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                        <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                        Article
                                    </span>
                                    <span className="text-sm">{getTimeDifference(blog.createdAt)}</span>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white"><a href={'/blog/' + blog._id}>{blog.title}</a></h2>
                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{(blog?.content).slice(0,200)}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        <img className="w-7 h-7 rounded-full" src={'author.jpg'} alt="Umesh Thapa" />
                                        <span className="font-medium text-white">
                                            Umesh Thapa
                                        </span>
                                    </div>
                                    <a  href={'/blog/' + blog._id} className="inline-flex items-center font-medium text-primary-600 text-white hover:underline">
                                        Read more
                                        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
