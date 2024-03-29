"use client";

import { Suspense, useState } from "react";
import dynamic from 'next/dynamic';

import { InputTags } from 'react-bootstrap-tagsinput';
import 'react-bootstrap-tagsinput/dist/index.css';

const EditorComp = dynamic(() => import('../write-blog/editor'), { ssr: false });

const markdown = `
.....
`

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');

  const [tags, setTags] = useState<string[]>([]);

  const handleContentChange = (newContent:string) => {
    setContent(newContent);
  };

  const handleTitleChange = (event:any) => {
    setTitle(event.target.value);
  };

  const handleThumbnailChange = (event:any) => {
    const file = event.target.files[0];
    setThumbnail(file || null);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData();
    formData.append("title", title);
    if (thumbnail !== null) {
    formData.append("thumbnail", thumbnail);
    }
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));

    try {
      const response = await fetch("https://me-server-git-main-ewumeshs-projects.vercel.app/api/blog", {
       method:"POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post created successfully!");
        setTitle('');
        setContent('');
        setThumbnail(null);
      } else {
        console.error("Failed to create blog post:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

 

  return (
    <main className="container px-20 mt-[100px] my-10 pt-50">
      <div className="bg-gray-900  rounded-md p-4">
        <div className="text-white">
          <h1 className="text-4xl font-bold ">Write a Blog</h1>
          <p className="mt-4 text-lg">Write your thoughts freely!</p>
        </div>
        <div className="mt-8">
          <form method="post">
            <label className="block text-sm font-medium leading-6 text-white">Title</label>
            <input type="text" name="title" onChange={handleTitleChange} placeholder="Enter Blog Title" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />

            <label className="block text-sm font-medium leading-6 text-white">Thumbnail</label>
            <input type="file" onChange={handleThumbnailChange} name="thumbnail" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />

            <div className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full">
              <label className="block text-sm font-medium leading-6 text-white">Content</label>
              <Suspense fallback={null}>
                <EditorComp markdown={markdown} onChange={handleContentChange} />
              </Suspense>
            </div>

            <div style={{ margin: 10 }}>
      <div className='input-group py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full'>
      <label className="block text-sm font-medium leading-6 text-white">Tags</label>
        <InputTags className="py-2 px-4 bg-gray-800 text-white rounded-md  w-full mb-4 mt-4" values={tags} onTags={(value) => setTags(value.values)} />
        {/* <button
          className='btn btn-outline-secondary'
          type='button'
          data-testid='button-clearAll'
          onClick={() => {
            setState([])
          }}
        >
          Delete all
        </button> */}
      </div>
      <hr />
      {/* <ol>
        {tags.map((item, index) => (
          <li key={item + index}>{item}</li>
        ))}
      </ol> */}
    </div>

            <button onClick={handleSubmit} type="submit" className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 focus:outline-none">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
