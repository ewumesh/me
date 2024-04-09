
'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { API_URL } from '@/constants';




export default function Blogs() {
	const [blogs, setBlogs] = useState<any[]>([]);

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

	function formatDate(dateString:string) {
		const date = parseISO(dateString);
		return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
		}

	const getBlogs = async () => {
		try {
			const response = await fetch(`${API_URL.url}/api/blog`, {});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setBlogs(data);
		} catch (error) {
			console.error("Error fetching latest blogs:", error);
		}
	};

    useEffect(() => {
        getBlogs();

    }, []);
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 mt-15 pt-20 backdrop-blur-sm">
			{blogs.length > 0 && (
	<div className="px-20 mx-auto space-y-6 sm:space-y-12 ">
		<a rel="noopener noreferrer" href={'/blog/' + blogs[0]?._id} className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
			<img src={blogs[0]?.thumbnail} alt="" className="object-cover w-full h-64 rounded sm:h-80 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-xl font-semibold sm:text-md group-hover:underline group-focus:underline text-white">{blogs[0].title}</h3>
				{blogs[0].createdAt && (
					<span className="text-xs dark:text-gray-400 text-white">{formatDate(blogs[0].createdAt)}</span>
				)}
				<p className='text-white'>{extractTextContentFromHTML(blogs[0].content).slice(0,500)}</p>
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
					<p className='text-white text-sm'>{extractTextContentFromHTML(blog.content).slice(0,150)}..</p>
				</div>
			</a>
		))}
		</div>
		<div className="flex justify-center">
			<button type="button" className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400 text-white">Load more posts...</button>
		</div>
	</div>
			)}
</section>
    )
}