import { Suspense, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { InputTags } from "react-bootstrap-tagsinput";
import { API_URL } from "@/constants";
import 'react-quill/dist/quill.snow.css';
import { Token } from "@/middleware/token-middleware";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const EditorComp = dynamic(() => import('../sub/editor'), { ssr: false });

const markdown = `
.....
`

export default function WriteBlog() {
  const [loggedUserId, setLoggedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');
  const [blogCategories, setBlogCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

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

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log(user?.user?._id, 'USERRRR')
    setLoggedUserId(user?.user?._id);
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

  const handleConslusionChange = (event: any) => {
    setConclusion(event.target.value);
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
    formData.append("excerpt", conclusion);
    formData.append("category", category);
    if (thumbnail !== null) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("content", content);
    formData.append("user", JSON.stringify(loggedUserId));
    formData.append("tags", JSON.stringify(tags));

    try {
      const response = await Token(fetch)(`${API_URL.url}/api/blog`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Blog post created successfully!");
        setTitle('');
        setConclusion('');
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

            <label className="block text-sm font-medium leading-6 text-white">Conclusion</label>
            <input type="text" name="title" onChange={handleConslusionChange} value={conclusion} placeholder="Enter Conclusion" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />

            <div>
              <div className='input-group py-2 px-4  bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full'>
                <label className="block text-sm font-medium leading-6 text-white">Tags</label>
                <InputTags className="py-2 bg-gray-800 text-white rounded-md  w-full mb-4 mt-4" values={tags} onTags={(value) => setTags(value.values)} />
              </div>
            </div>


            <button onClick={handleDraftSave} 
            color="default"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
             
            >
               {isDrafting ? "Saving" : "Draft"}
            </button>
            <button onClick={handleSubmit} 
              color="secondary"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
              
            >
              {isLoading ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}