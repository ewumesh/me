
'use client'

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { parseISO, format } from 'date-fns';
import Image from 'next/image';

function formatDate(dateString:string) {
const date = parseISO(dateString);
return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
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

function convertToSlug(inputString: string): string {
    // Convert string to lowercase
    const lowercaseString = inputString.toLowerCase();
    // Replace spaces with hyphens
    const slugString = lowercaseString.replace(/\s+/g, '-');
    return slugString;
}

export default function Blogs() {
	const [allBlogs, setAllBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ewumesh');
                setAllBlogs(res.data.items);
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            }
        };

        fetchBlogs();
    }, []);
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 mt-15 pt-20">
			{allBlogs.length > 0 && (
	<div className="px-20 mx-auto space-y-6 sm:space-y-12 ">
		<a rel="noopener noreferrer" href={'/blog/' + convertToSlug(allBlogs[0].title)} className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
			<Image src="https://source.unsplash.com/random/" alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">{allBlogs[0].title}</h3>
				<span className="text-xs dark:text-gray-400">{formatDate(allBlogs[0].pubDate)}</span>
				<p>{extractTextFromHTML(allBlogs[0].description).slice(0,800)}</p>
			</div>
		</a>
		<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{allBlogs.slice(1,9).map((blog, index) => (
			<a key={index} rel="noopener noreferrer" href={'/blog/' + convertToSlug(blog.title)} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://source.unsplash.com/random/480x360?'+index} />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{blog.title}</h3>
					<span className="text-xs dark:text-gray-400">{formatDate(blog.pubDate)}</span>
					<p>{extractTextFromHTML(blog.description).slice(0,200)}</p>
				</div>
			</a>
		))}
			{/* <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?2" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs dark:text-gray-400">January 22, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?3" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs dark:text-gray-400">January 23, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 hidden sm:block">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?4" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs dark:text-gray-400">January 24, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 hidden sm:block">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?5" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs dark:text-gray-400">January 25, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 hidden sm:block">
				<Image alt="" role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?6" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
					<span className="text-xs dark:text-gray-400">January 26, 2021</span>
					<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
				</div>
			</a> */}
		</div>
		<div className="flex justify-center">
			<button type="button" className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400">Load more posts...</button>
		</div>
	</div>
			)}
</section>
    )
}