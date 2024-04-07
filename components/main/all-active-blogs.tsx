import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { parseISO, format } from 'date-fns';
import { API_URL } from "@/constants";
import Link from "next/link";

export default function AllActiveBlogs() {
    const [allBlogs, setAllBlogs] = useState<any[]>([]);
    const [blog, setBlog] = useState<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    const togglePopover = () => {
        setIsOpenPopover(!isOpenPopover);
    };

    const getAllActiveBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL.url}/api/blog`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setIsLoading(false);
            setAllBlogs(data);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching blogs:", error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
    }

    useEffect(() => {
        getAllActiveBlogs();
    }, []);

    const handleEditBlog = (blog: any) => {

    }

    const handleDeleteBlog = (blog: any) => {
        setBlog(blog);
        onOpen();
    }

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        let blogId = blog._id;
        try {
            const response = await axios.delete(`${API_URL.url}/api/blog/${blogId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log("Blog Category deleted successfully!");
                onClose();
                setIsDeleting(false);
                getAllActiveBlogs();
            } else {
                setIsDeleting(false);
                console.error("Failed to delete blog:", response.statusText);
                if (response.status === 404) {
                    console.error("Blog not found.");
                }
            }
        } catch (error) {
            setIsDeleting(false);
            console.error("Error:", error);
        }
    }

    return (
        <section>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {!isLoading && (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S.N.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Published Date
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBlogs.map((blog: any, index: number) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {blog?.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {blog?.category || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {blog?.status || '-'}
                                    </td>
                                    <td>
                                        {formatDate(blog?.updatedAt) || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={'/blog-management/edit-blog/'+blog?._id}>
                                        <button type="button" className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                            <svg className="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                            </svg>
                                            <span className="sr-only">Icon description</span>
                                        </button>
                                        </Link>

                                        <button className="mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                            <svg className="w-[14px] h-[14px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                            </svg>

                                            <span className="sr-only">Icon description</span>
                                        </button>

                                        
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {isLoading && (
                    <div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}

            </div>

        </section>
    )
}