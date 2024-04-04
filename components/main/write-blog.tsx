import { Suspense, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { InputTags } from "react-bootstrap-tagsinput";
import { Button } from "@nextui-org/react";

const EditorComp = dynamic(() => import('../sub/editor'), { ssr: false });

const markdown = `
.....
`

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');
  const [blogCategories, setBlogCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  const getBlogCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/blog-category');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogCategories(data);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  };

  useEffect(() => {
    getBlogCategories();
  }, []);

  const handleDraftSave = () => {
    setIsDrafting(true);
  }

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
      const response = await fetch("https://me-server-git-main-ewumeshs-projects.vercel.app/api/blog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post created successfully!");
        setTitle('');
        setContent('');
        setThumbnail(null);
        setIsLoading(false);
        setCategory('');
        setTags([]);
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
      <div className="bg-gray-900  rounded-md p-4">
        <div className="text-white">
          <h1 className="text-4xl font-bold ">Write a Blog {process.env.API_URL}</h1>
          <p className="mt-4 text-lg">Write your thoughts freely!</p>
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
              <Suspense fallback={null}>
                <EditorComp markdown={markdown} onChange={handleContentChange} />
              </Suspense>
            </div>

            <div>
              <div className='input-group py-2 px-4  bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full'>
                <label className="block text-sm font-medium leading-6 text-white">Tags</label>
                <InputTags className="py-2 bg-gray-800 text-white rounded-md  w-full mb-4 mt-4" values={tags} onTags={(value) => setTags(value.values)} />
              </div>
            </div>

            <Button onClick={handleDraftSave} isLoading={isDrafting}
            color="default"
            className="mx-1"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
               {isDrafting ? "Saving" : "Draft"}
            </Button>
            <Button onClick={handleSubmit} isLoading={isLoading}
              color="secondary"
              className="mx-1"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}