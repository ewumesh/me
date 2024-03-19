import Marquee from "react-fast-marquee";
import { PARTNERS } from "@/constants";
import Link from "next/link";
import Image from "next/image";

export const Partners = () => {
  return (
    <section className="px-20">
<div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Trusted By</h2>
      </div>
      <Marquee className="grid grid-cols-4 gap-4">
        {PARTNERS.map((p) => (
          <Link href={p.link} target="_blank" key={p.name}>
            <div className="px-2">
              <Image  alt={p.name} className="rounded-lg" style={{ height: '100px' }} src={p.image} />
            </div>
          </Link>
      ))}
      </Marquee>

    </section>
  )
}