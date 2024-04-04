import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { parseISO, format } from 'date-fns';

export default function AllActiveBlogs() {
    const [allBlogs, setAllBlogs] = useState<any[]>([]);
    const [blog, setBlog] = useState<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);

    const getAllActiveBlogs = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/blog');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllBlogs(data);
        } catch (error) {
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
            const response = await axios.delete(`http://localhost:3001/api/blog/${blogId}`, {
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
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>S.N.</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>PUBLISHED DATE</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No data to display."}>
                    {allBlogs.map((blog: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{blog?.title}</TableCell>
                            <TableCell>{blog?.category || '-'}</TableCell>
                            <TableCell>{blog?.status || '-'}</TableCell>
                            <TableCell>{formatDate(blog?.updatedAt) || '-'}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditBlog(blog)} color="secondary" className="mx-1" isIconOnly radius="full">
                                    <FaEdit></FaEdit>
                                </Button>
                                <Button onClick={() => handleDeleteBlog(blog)} color="danger" className="mx-1" isIconOnly radius="full">
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

                                    <Button isLoading={isDeleting} onClick={handleDeleteConfirm}
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
                                        {isDeleting ? 'Deleting': 'Delete'}
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
        </section>
    )
}