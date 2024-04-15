"use client"

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { parseISO, format, set } from 'date-fns';
import { usePathname } from 'next/navigation';
import { API_URL } from '@/constants';
import { FaEye, FaPen } from 'react-icons/fa';

export default function ViewBlog() {
    
    const [blogDetails, setBlogDetails] = useState<any>({});
    const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    const id = extractIdFromUrl(usePathname());

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange =(event:any) => {
        setEmail(event.target.value);
    }

    function calculateReadingTime(text:string) {
        // Average reading speed in words per minute
        const wordsPerMinute = 200;
    
        // Remove HTML tags and split the text into words
        const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/);
    
        // Calculate the number of words
        const wordCount = words.length;
    
        // Calculate the reading time in minutes
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
        return readingTime;
    }

    const submitNewsletter = async (event:any) => {
        setIsLoading(true);
        event.preventDefault(); // Prevents the default form submission behavior
    
        const formData = new FormData();
        formData.append("email", email);

        try {
            const response = await (fetch)(`${API_URL.url}/api/subscribe-newsletter`, {
              method: "POST",
              body: formData,
            });
      
            if (response.ok) {
                setEmail('');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
      console.error("Error:", error);
        }
    }

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
    }

    const getCategoryName = (id: any) => {
        const category = blogCategories.find(a => a._id === id)?.name;
        return category;
    }

    function extractIdFromUrl(url: string): string | null {
        const regex = /^\/blog\/([a-fA-F0-9]+)$/; // Regular expression to match "/blog/" followed by a hexadecimal ID
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1]; // Extracted ID
        } else {
            return null; // No match found
        }
    }

    const fetchBlogById = async () => {

        if (!id) return;
        try {
            const res = await axios.get(`${API_URL.url}/api/blog/${id}`);
            if (res?.data?.title) {
                // metadata.title = res?.data?.title;
            }
            setBlogDetails(res.data);
        } catch (error) {
            console.error("Error fetching latest blogs:", error);
        }
    };

    const getBlogsLatest = async () => {
        try {
            const response = await fetch(`${API_URL.url}/api/latest-blogs`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const opened = data.filter((a: any) => a._id !== id);
            setLatestBlogs(opened);
        } catch (error) {
            console.error("Error fetching latest blogs:", error);
        }
    };

    const getBlogCategories = async () => {
        try {
            const response = await fetch(`${API_URL.url}/api/blog-category`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBlogCategories(data);
        } catch (error) {
            console.error("Error fetching blog categories:", error);
        }
    };

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

    function formatViewCount(count:any) {
        if (count < 1000) {
            // If the count is less than 1000, return the count as is
            return count.toString();
        } else if (count < 1000000) {
            // If the count is less than 1 million, format it as 'x.xk'
            return (count / 1000).toFixed(1) + 'k';
        } else {
            // If the count is 1 million or more, format it as 'x.xM'
            return (count / 1000000).toFixed(1) + 'M';
        }
    }

    useEffect(() => {
        fetchBlogById();
        getBlogsLatest();
        getBlogCategories();
    }, [id]);

    return (
        <section>
            <main className="md:pt-8 pt-20 pb-5 lg:pt-16 lg:pb-24  dark:bg-gray-900 antialiased backdrop-blur-sm">
                <div className="flex justify-between md:px-20 px-8 top-10">
                    <article className="mx-auto w-full  format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img className="w-12 h-12 rounded mr-2" src={blogDetails?.user?.image} title={blogDetails?.user?.name} alt={blogDetails?.user?.name} />
                                    <div>
                                        <a href="Javascript:;" rel="author" className="text-xl font-bold text-gray-500 dark:text-white" title={blogDetails?.user?.name}>{blogDetails?.user?.name}</a>
                                        <p className="text-base text-gray-500 dark:text-gray-500">Software Developer</p>
                                        {blogDetails?.createdAt && (
                                            <p className="text-base text-gray-500 dark:text-gray-500">{formatDate(blogDetails?.createdAt)}</p>

                                        )}
                                    </div>
                                </div>
                            </address>
                            {blogDetails?.category  && (
                                <span className="bg-gray-100 rounded px-3 py-1 text-sm font-semibold text-gray-600">{getCategoryName(blogDetails?.category)}</span>
                            )}

                            {blogDetails?.view && blogDetails.view > 0 && (
                                <kbd className="bg-gray-100 inline-flex items-center rounded px-3 py-1 text-sm font-semibold text-gray-600 mx-2">
                                    <FaEye size={10}/>   {formatViewCount(blogDetails?.view)}
                                </kbd>
                            )}

{blogDetails?.content && (
                                <kbd className="bg-gray-100 inline-flex items-center rounded px-3 py-1 text-sm font-semibold text-gray-600 mx-2">
                                    {calculateReadingTime(blogDetails?.content)} min read
                                </kbd>
)}
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl text-white">{blogDetails?.title}</h1>
                        </header>

                        <figure className='mb-5'><img style={{ height: '400px', objectFit: 'cover', width: '100%' }} src={blogDetails?.thumbnail} alt="" />
                            {/* <figcaption className="text-base text-gray-500 dark:text-gray-400">Digital art by Anonymous</figcaption> */}
                        </figure>
                        {/* <MarkdownContent content={blogDetails?.content} /> */}
                        <div className="text-white" dangerouslySetInnerHTML={{ __html: blogDetails?.content }}></div>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className="flex gap-2 flex-wrap py-4">
                            <span className='text-white'>Tags:</span>
                            {blogDetails?.tags?.map((t: any, index: number) => (
                                <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">{t}</span>
                            ))}
                        </div>

                        <section className="not-format mt-10">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 text-white">Discussion</h2>
                            </div>
                            <form className="mb-6">
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={6}
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..." required></textarea>
                                </div>
                                <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Post comment
                                </button>
                            </form>
                        </section>
                    </article>
                    {latestBlogs?.length && (
                        <aside className="w-full lg:w-2/6 p-4 lg:p-8  backdrop-blur-sm">
                            <div className="sticky top-20">

                                <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
                                    <div className=" space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
                                        <button type="button" className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-600 text-white">Latest Blogs</button>
                                    </div>
                                    <div className="flex flex-col divide-y dark:divide-gray-800">
                                        {latestBlogs.slice(0, 5)?.map((lBlog: any, index: number) => (
                                            <div key={index} className="flex px-1 py-4">
                                                <img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500" src={lBlog?.thumbnail} />
                                                <div className="flex flex-col flex-grow">
                                                    <a rel="noopener noreferrer" href={'/blog/' + lBlog?._id} className="hover:underline text-white text-sm" title={lBlog?.title}>{lBlog?.title.slice(0, 60)}</a>
                                                    {lBlog?.createdAt && (
                                                        <p className="mt-auto text-xs text-white">{formatDate(lBlog?.createdAt)}</p>
                                                    )}

                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            <aside aria-label="Related articles" className="py-8 lg:py-24  backdrop-blur-sm">
                <div className="md:px-20 px-8 mx-auto">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 text-white">Related articles</h2>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <article className="max-w-xs">
                            <a href="#">
                                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" className="mb-5 rounded-lg" alt="Image 1" />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 text-white">
                                <a href="#">Our first office</a>
                            </h2>
                            <p className="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                            <a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-white hover:no-underline">
                                Read in 2 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" className="mb-5 rounded-lg" alt="Image 2" />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 text-white">
                                <a href="#">Enterprise design tips</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                            <a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-white hover:no-underline">
                                Read in 12 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" className="mb-5 rounded-lg" alt="Image 3" />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-white">
                                <a href="#">We partnered with Google</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                            <a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-white hover:no-underline">
                                Read in 8 minutes
                            </a>
                        </article>
                        <article className="max-w-xs">
                            <a href="#">
                                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" className="mb-5 rounded-lg" alt="Image 4" />
                            </a>
                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 text-white">
                                <a href="#">Our first project with React</a>
                            </h2>
                            <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                            <a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-white hover:no-underline">
                                Read in 4 minutes
                            </a>
                        </article>
                    </div>
                </div>
            </aside>

            <section className="backdrop-blur-sm">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md sm:text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-white">Sign up for our newsletter</h2>
                        <p className="mx-auto mb-8 max-w-2xl  text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                        <form action="#">
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input onChange={handleEmailChange} value={email} className="block p-3 pl-9 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" />
                                </div>
                                <div>
                                    <button disabled={isLoading} type="submit" onClick={submitNewsletter} className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        
                                    {/* {isLoading && (
	<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg>
)} */}

                                        {isLoading ? 'Wait...' :'Subscribe'}
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="Javascript:;" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    )
}