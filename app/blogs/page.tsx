
'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { API_URL } from '@/constants';




export default function Blogs() {
	const [blogs, setBlogs] = useState<any[]>([]);
	const [limit, setLimit] = useState<any>(20);
    const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	function extractTextContentFromHTML(htmlString: string): string {
		// Create a new DOMParser instance
		const parser = new DOMParser();
		// Parse the HTML string into a document object
		const doc = parser.parseFromString(htmlString, 'text/html');
		// Extract the text content from the document
		const textContent = doc.body.textContent || '';
		// Return the extracted text content
		return textContent;
	}

	const loadMore = () => {
		setIsLoading(true);
		if(limit <= totalPages) {
			setLimit(limit+5);
			getBlogs();
		}
    };

	function formatDate(dateString:string) {
		const date = parseISO(dateString);
		return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
		}

	const getBlogs = async () => {
		try {
			const response = await fetch(`${API_URL.url}/api/blog?page=${1}&limit=${limit}`, {});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setBlogs(data?.blogs);
			setTotalPages(data.totalBlogs);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error("Error fetching latest blogs:", error);
		}
	};

    useEffect(() => {
        getBlogs();

    }, []);
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 mt-15 pt-20 backdrop-blur-sm">
			{blogs.length > 0 && (
	<div className="md:px-32 px-8 mx-auto space-y-6 sm:space-y-12 ">
		<a rel="noopener noreferrer" href={'/blog/' + blogs[0]?._id} className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
			<img src={blogs[0]?.thumbnail} alt="" className="object-cover w-full h-64 rounded sm:h-80 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-xl font-semibold sm:text-md group-hover:underline group-focus:underline text-white">{blogs[0].title}</h3>
				{blogs[0].createdAt && (
					<span className="text-xs dark:text-gray-400 text-white">{formatDate(blogs[0].createdAt)}</span>
				)}
				<p className='text-white'>{(blogs[0].excerpt)}</p>
			</div>
		</a>
		<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{blogs.slice(1,100).map((blog, index:number) => (
			<a key={index} rel="noopener noreferrer" href={'/blog/' + blog?._id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 border border-zinc-900 rounded">
				<img alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={blog?.thumbnail} />
				<div className="p-6 space-y-2">
					<h3 className="text-md font-bold group-hover:underline group-focus:underline text-white">{blog.title.slice(0,65)}</h3>
					{blog.createdAt && (
					<span className="text-xs dark:text-gray-400 text-white">{formatDate(blog?.createdAt)}</span>
					)}
					<p className='text-white text-sm' title={blog.excerpt}>{blog.excerpt.slice(0,100)}..</p>
				</div>
			</a>
		))}
		</div>
		<div className="flex justify-center">
<button onClick={loadMore} disabled={isLoading || limit >= totalPages} type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">

{isLoading && (
	<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg>
)}

{isLoading ? 'Loading...' :'Load More..'}

</button>
		</div>
	</div>
			)}
</section>
    )
}