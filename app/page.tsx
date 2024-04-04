"use client"
import { Partners } from "@/components/main/partners";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { LatestBlogs } from "@/components/main/latest-blogs";
import { Projects } from "@/components/main/projects";
import { Services } from "@/components/main/services";
import { Skills } from "@/components/main/skills";
import { MQ } from "@/components/main/mq";
import { useState } from "react";

import { FaMoon, FaSun } from 'react-icons/fa'; // Importing Moon and Sun icons
import { motion } from 'framer-motion';

 // Define the animation for the icon
 const iconAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [theme, setTheme] = useState('light');

 const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
 };
 
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Services />
        <Projects />
        <LatestBlogs />
        {/* <motion.button
        className="floating-button"
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={iconAnimation}
      >
        {theme === 'light' ? (
          <FaSun size={24} />
        ) : (
          <FaMoon size={24} />
        )}
      </motion.button> */}
        {/* <Partners /> */}
        <MQ/>
      </div>
    </main>
  );
}
