"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BlogCategory from "@/components/main/blog-category";
import WriteBlog from "@/components/main/write-blog";
import AllActiveBlogs from "@/components/main/all-active-blogs";
import AllDraftBlogs from "@/components/main/all-draft-blogs";

export default function BlogManagement() {
  return (
    <section>
    <main className="container px-20   pt-[100px]">
      <div className="flex w-full flex-col">
        <Tabs
          
          aria-label="Options"
          variant={"bordered"}
          color="secondary" >

          <Tab key="active" title="Active">
            <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <AllActiveBlogs />
              </CardBody>
            </Card>
          </Tab>

          <Tab id='drafts' key="draft" title="Draft">
            <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <AllDraftBlogs />
              </CardBody>
            </Card>
          </Tab>

          <Tab id='blog-category' key="blogCategory" title="Blog Category">
            <Card>
              <CardBody className="bg-gray-900  rounded-md p-4">
                <BlogCategory />
              </CardBody>
            </Card>
          </Tab>

          <Tab id='write-blog' key="writeBlog" title="Write Blog">
            <Card>
              <CardBody className="bg-[#111827]">
                <WriteBlog></WriteBlog>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </main>
    </section>
  );
}
