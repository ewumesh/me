import Marquee from "react-fast-marquee";
import { PARTNERS } from "@/constants";
import Link from "next/link";

export const Partners = () => {
  return (
    <section className="px-20">
<div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Trusted By</h2>
          {/* <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p> */}
      </div>
      <Marquee className="grid grid-cols-4 gap-4">
        {PARTNERS.map((p) => (
          <Link href={p.link} title={p.name}>
            <div className="px-2">
              <img className="rounded-lg" style={{ height: '100px' }} src={p.image} />
            </div>
          </Link>
      ))}
      </Marquee>

    </section>
  )
}