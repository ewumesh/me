import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



export default function AllDraftBlogs() {


    return (
        <section>
            <Table aria-label="Example empty table">
                  <TableHeader>
                  <TableColumn>S.N.</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
                </Table>
        </section>
    )
}