"use client";

import 'react-bootstrap-tagsinput/dist/index.css';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BlogCategory from "@/components/main/blog-category";
import WriteBlog from "@/components/main/write-blog";
import AllActiveBlogs from "@/components/main/all-active-blogs";
import AllDraftBlogs from "@/components/main/all-draft-blogs";
import { useEffect, useState } from 'react';
import {Route, Routes, useLocation} from "react-router-dom";


export default function BlogManagement() {

  useEffect(() => {
   
  }, []);


  const {pathname} = useLocation();

  return (
    <main className="container px-20   pt-[100px]">
      <div className="flex w-full flex-col">
        <Tabs
          selectedKey={pathname}
          aria-label="Options"
          variant={"bordered"}
          color="secondary" >

          <Tab key="active" title="Active" id='/'  href="/">
            {/* <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <AllActiveBlogs />
              </CardBody>
            </Card> */}
          </Tab>

          <Tab id='drafts' href='/drafts' key="draft" title="Draft">
            {/* <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <AllDraftBlogs />
              </CardBody>
            </Card> */}
          </Tab>

          <Tab id='blog-category' href='/blog-category' key="blogCategory" title="Blog Category">
            {/* <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <BlogCategory />
              </CardBody>
            </Card> */}
          </Tab>

          <Tab id='write-blog' href='/write-blog' key="writeBlog" title="Write Blog">
            {/* <Card>
              <CardBody className="bg-[#111827]">
                <WriteBlog></WriteBlog>
              </CardBody>
            </Card> */}
          </Tab>
        </Tabs>

        <Routes>
        <Route path="/" element={<AllActiveBlogs />} />
        <Route path="/drafts" element={<AllDraftBlogs />} />
        <Route path="/blog-category" element={<BlogCategory />} />
        <Route path="/write-blog" element={<WriteBlog />} />
      </Routes>
      </div>
    </main>
  );
}
