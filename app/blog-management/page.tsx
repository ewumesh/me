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


<div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Active Blogs</button>
        </li>
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Draft Blogs</button>
        </li>
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Blog Category</button>
        </li>
        <li role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-styled-tab" data-tabs-target="#styled-contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Write Blog</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
        <AllActiveBlogs />
    </div>
    <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
        <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
    </div>
    <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
        <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
    </div>
    <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-contacts" role="tabpanel" aria-labelledby="contacts-tab">
        <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
    </div>
</div>



        {/* <Tabs
          
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
        </Tabs> */}
      </div>
    </main>
    </section>
  );
}
