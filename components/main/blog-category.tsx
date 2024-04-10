import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "@/constants";
import { Token } from "@/middleware/token-middleware";

export default function BlogCategory() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<any>(null);
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getBlogCategories();
    }, []);


    const handleDeleteCategory = (category: any) => {
        setCategory(category);
        onOpen();
    }

    const handleDeleteConfirm = () => {
        setIsDeleting(true);
        handleDeleteCategoryAfterConfirm(category);
    }

    const handleDeleteCategoryAfterConfirm = async (category: any) => {
        setIsDeleting(true);
        let blogCategoryId = category._id;
        try {
            const response = await axios.delete(`${API_URL.url}/api/blog-category/${blogCategoryId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log("Blog Category deleted successfully!");
                setName('');
                onClose();
                setIsDeleting(false);
                getBlogCategories();
            } else {
                setIsDeleting(false);
                console.error("Failed to delete blog category:", response.statusText);
                if (response.status === 404) {
                    console.error("Blog Category not found.");
                }
            }
        } catch (error) {
            setIsDeleting(false);
            console.error("Error:", error);
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

    const handleEditCategory = (category: any) => {
        window.scroll(0, 0);
        setIsEditing(true);
        setEditingCategory(category);
        setName(category.name);
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleReset = (event: any) => {
        setName('');
        setIsEditing(false);
        setIsLoading(false);
    };

    const handleSaveChange = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", name);

        try {
            let response;
            if (isEditing) {
                response = await fetch(`${API_URL.url}/api/blog-category/${editingCategory._id}`, {
                    method: "PUT",
                    // headers: {
                    //     "Content-type": "application/json"
                    // },
                    body: formData,
                });
            } else {
                response = await fetch(`${API_URL.url}/api/blog-category`, {
                    method: "POST",
                    body: formData,
                });
            }

            if (response.ok) {
                console.log("Blog Category saved successfully!");
                setName('');
                setIsEditing(false);
                setEditingCategory(null);
                setIsLoading(false);
                getBlogCategories();
            } else {
                setIsLoading(true);
                console.error("Failed to save blog category:", response.statusText);
            }
        } catch (error) {
            setIsLoading(true);
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <div className="bg-gray-900  rounded-md p-4">
                <div className="text-white">
                    <h3 className="text-1xl font-bold ">Add Blog Category</h3>
                </div>
                <div className="mt-8">
                    <form method="post">
                        <label className="block text-sm font-medium leading-6 text-white">Name</label>
                        <input type="text" name="title" value={name} onChange={handleNameChange} placeholder="Enter Blog Category" className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none w-full mb-4" required />
                        <Button onClick={handleSaveChange} isLoading={isLoading}
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
                            {isEditing ? "Update" : "Save"}
                        </Button>

                        <Button className="mx-1" onClick={handleReset} color="danger" >
                            Reset
                        </Button>

                    </form>
                </div>
            </div>

            <div className="bg-gray-900  rounded-md p-4 mt-5">
                <div className="text-white">
                    <h3 className="text-1xl font-bold ">All Blog Categories</h3>
                </div>
                <Table aria-label="Example empty table">
                    <TableHeader>
                        <TableColumn>S.N.</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No data to display."}>
                        {blogCategories.map((category: any, index: number) => (

                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{category?.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditCategory(category)} color="secondary" className="mx-1" isIconOnly radius="full">
                                        <FaEdit></FaEdit>
                                    </Button>
                                    <Button onClick={() => handleDeleteCategory(category)} color="danger" className="mx-1" isIconOnly radius="full">
                                        <FaTrash></FaTrash>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                                <ModalBody>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    {/* <Button color="secondary" onPress={handleDeleteConfirm}>
                  Yes
                </Button> */}

                                    <Button onClick={handleDeleteConfirm} isLoading={isDeleting}
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
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </section>
    )
}