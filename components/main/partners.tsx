"use client";

import Marquee from "react-fast-marquee";
import { PARTNERS } from "@/constants";
import Link from "next/link";
import { slideInFromTop } from "@/lib/motion";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

import {
  slideInFromLeft,
  slideInFromRight
} from "@/lib/motion";

export const Partners = () => {
  return (
    <section className="px-20 my-5">
<div className="mx-auto max-w-screen-sm text-center">
          <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
        Proven
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        With Great Outcomes.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
       Our customers have gotten offers from awesome companies.
      </motion.div>
    </div>
      </div>
      <Marquee className="grid grid-cols-4 gap-4">
        {PARTNERS.map((p) => (
          <Link href={p.link} target="_blank" key={p.name}>
            <div className="px-2">
              <img  alt={p.name} className="rounded-lg" style={{ height: '100px' }} src={p.image} />
            </div>
          </Link>
      ))}
      </Marquee>

    </section>
  )
}