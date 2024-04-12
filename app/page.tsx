import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { LatestBlogs } from "@/components/main/latest-blogs";
import { Projects } from "@/components/main/projects";
import { Services } from "@/components/main/services";
import { Skills } from "@/components/main/skills";
import { MQ } from "@/components/main/mq";

export default function Home() { 
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Services />
        <Projects />
        <LatestBlogs />
        <MQ/>
      </div>
    </main>
  );
}
