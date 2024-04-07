"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BlogCategory from "@/components/main/blog-category";
import WriteBlog from "@/components/main/write-blog";
import AllActiveBlogs from "@/components/main/all-active-blogs";
import AllDraftBlogs from "@/components/main/all-draft-blogs";
import { InputTags } from "react-bootstrap-tagsinput";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import { redirect, usePathname } from "next/navigation";
import axios from "axios";


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function EditBlog() {
    // const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [content, setContent] = useState('');
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const id = extractIdFromUrl(usePathname());

    
    function extractIdFromUrl(url: string): string | null {
        // Adjusted regular expression to match the structure of your URLs
        const regex = /^\/blog-management\/edit-blog\/([a-fA-F0-9]+)$/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1]; // Extracted ID
        } else {
            return null; // No match found
        }
    }

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

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

    const fetchBlogById = async () => {
            
        if (!id) return; 
        try {
            const res = await axios.get(`${API_URL.url}/api/blog/${id}`);
            setTitle(res?.data?.title);
            setCategory(res?.data?.category);
            setContent(res?.data?.content);
            setTags(res?.data.tags);
        } catch (error) {
            console.error("Error fetching latest blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogById();
        getBlogCategories();
        
    },[id]);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event: any) => {
        setCategory(event.target.value);
    };

    const handleThumbnailChange = (event: any) => {
        const file = event.target.files[0];
        setThumbnail(file || null);
    };

    const handleSubmit = async (event: any) => {
        setIsLoading(true);
        event.preventDefault(); // Prevents the default form submission behavior

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        if (thumbnail !== null) {
            formData.append("thumbnail", thumbnail);
        }
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tags));

        try {
            const response = await fetch(`${API_URL.url}/api/blog/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                console.log("Blog Updated successfully!");
                setTitle('');
                setContent('');
                setThumbnail(null);
                setIsLoading(false);
                setCategory('');
                setTags([]);
                redirect('/blog-management')
                // router.push('/blog-management')
            } else {
                setIsLoading(false);
                console.error("Failed to create blog post:", response.statusText);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <main className="container px-20   pt-[100px]">
                <div className="flex w-full flex-col">
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
                            <li className="me-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Edit Blog</button>
                            </li>
                        </ul>
                    </div>

                    <div id="default-styled-tab-content">
                        <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="bg-gray-900  rounded-md p-4">
                                <div className="text-white">
                                    <h1 className="text-4xl font-bold ">Edit Blog</h1>
                                    {/* <p className="mt-4 text-lg">Write your thoughts freely!</p> */}
                                </div>
                                <div className="mt-8">
                                    <form autoFocus={false} autoComplete="off">
                                        <label className="block text-sm font-medium leading-6 text-white">Title</label>
                                        <input type="text" name="title" onChange={handleTitleChange} value={title} placeholder="Enter Blog Title" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />

                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select onChange={handleCategoryChange} value={category} id="small" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4">
                                            {blogCategories.map((category: any, index: number) => (
                                                <option key={index} value={category?._id}>{category?.name}</option>
                                            ))}
                                        </select>

                                        <label className="block text-sm font-medium leading-6 text-white">Thumbnail</label>
                                        <input type="file" onChange={handleThumbnailChange} name="thumbnail" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />

                                        <div className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full">
                                            <label className="block text-sm font-medium leading-6 text-white">Content</label>
                                            {/* <Suspense fallback={null}>
                <EditorComp markdown={markdown} onChange={handleContentChange} />
              </Suspense> */}

                                            <QuillEditor
                                                value={content}
                                                onChange={handleContentChange}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                className="w-full h-[70%] mt-10"
                                            />
                                        </div>

                                        <div>
                                            <div className='input-group py-2 px-4  bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full'>
                                                <label className="block text-sm font-medium leading-6 text-white">Tags</label>
                                                <InputTags className="py-2 bg-gray-800 text-white rounded-md  w-full mb-4 mt-4" values={tags} onTags={(value) => setTags(value.values)} />
                                            </div>
                                        </div>


                                        
                                        <button onClick={handleSubmit}
                                            color="secondary"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"

                                        >
                                            {isLoading ? "Updating" : "Update"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}