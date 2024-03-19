import Marquee from "react-fast-marquee";
import { PARTNERS } from "@/constants";

export const Partners = () => {
  return (
    <section className="px-20">
      
      <Marquee className="grid grid-cols-4 gap-4">
      {PARTNERS.map((p) => (
        <div className="px-2">
  <img className="rounded-lg" style={{height:'100px'}} src={p.image} />
  </div>
      ))}
</Marquee>

    </section>
  )}