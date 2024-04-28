"use client";

import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

import { slideInFromTop } from "@/lib/motion";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

import {
  slideInFromLeft,
  slideInFromRight
} from "@/lib/motion";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >

<div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
        Innovate
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        Our Projects
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className=" text-[20px] text-gray-500 mb-10 mt-[5px] text-center"
      >
        Empowering communities through sustainable technology solutions for a brighter tomorrow.
      </motion.div>
    </div>

      {/* <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Our Projects
      </h1>  */}
      {/* grid grid-cols-4 gap-4 */}
      {/* flex flex-col md:flex-row */}
      <div className="h-full w-full  grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  md:px-32 px-8">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description.slice(0,150)}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};
