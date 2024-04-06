import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const API_URL = {url:'https://me-server-git-main-ewumeshs-projects.vercel.app'} //http://localhost:30001 // https://me-server-git-main-ewumeshs-projects.vercel.app

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com/ewumesh",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com/ewumesh",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com/ewumesh",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "Rooms24",
    description:
      'Your ultimate destination for flexible and secure online hotel bookings, where a seamless User Interface (UI) meets an unparalleled User Experience (UX). Our innovative platform not only caters to traditional daily bookings but also introduces a unique and flexible approach with hourly bookings.',
    image: "/projects/room.png",
    link: "https://rooms24.netlify.app",
  },
  {
    title: "The Healthhub Nepal",
    description:
      'Discover Health Hub Nepal, your comprehensive guide to leading a healthy lifestyle. Our platform offers a wealth of information on nutrition, fitness, and overall well-being, tailored specifically for residents of Nepal.',
    image: "/projects/health.png",
    link: "https://healthhubnepal.netlify.app/home",
  },
  {
    title: "Venio Systems",
    description:
      'Venio is the best integrated eDiscovery platform on the market, and OPTiMO offers that best-in-breed technology as a managed service to streamline the eDiscovery process, lower costs, and provide a predictable pricing model.',
    image: "/projects/v1.png",
    link: "https://www.veniosystems.com/",
  },
  {
    title:'Affixlink',
    description:'Tap to connect! Share your social media links; Share your book and files; Share your images and videos.',
    image: "/projects/app.png",
    link: "https://admin.affixlink.app/auth/login",
  },

  {
    title:'Demat',
    description:'DEMAT is a Gurkha Finance authorised demat account cloud registration platform where the user can perform all registration, approval, payment, etc throught the application.',
    image: "/projects/gfl.png",
    link: "https://demat.gurkhasfinance.com.np/",
  },
  {
    title:'Trekcard',
    description:'Trekking Recreation Expedition in Khumbu made safer with Trekcard.',
    image: "/projects/tcard.png",
    link: "https://trekcard.app/",
  },


  {
    title: "Sajha Investment",
    description:
      'Sajha Real Estate Investment Company Pvt. Ltd. was established to make the real estate business systematic, reliable, and accessible to everyone. It is a company formed by young and energetic business personalities.',
    image: "/projects/sajha.png",
    link: "https://sajhainvestment.com/",
  },
  {
    title: "BRIKSHYA PRODUCTION",
    description:
      'Brikshya Production team is a business that provides the physical basis for works in the fields of performing arts, new media art, film, television, radio, comics, interactive arts, video games, websites, and video.',
    image: "/projects/b1.png",
    link: "https://brikshya.com",
  },
  {
    title: "Suchana Park",
    description:
      'Suchana Park offers unparalleled convenience and information, all within a single application. Whether youre seeking news, writing opportunities, language tools, financial information, or market updates, Suchana Park has it all...',
    image: "/projects/suchana.png",
    link: "https://suchanapark.com",
  },

  {
    title: "Allpasal",
    description:
      'Allpasal is an organization with a clear objective to manage, and distribute the goods produced from the production company to the markets. Allpasal, aims to distribute goods in the easiest ,cheapest and most convenient ways to the customers. Despite Nepals rich resources and flourishing markets, 80% of our Nepalese.. ',
    image: "/projects/a1.png",
    link: "https://allpasal.com",
  },



  {
    title: "Onlot Express",
    description:
      'Omlot Express is a software application that helps businesses and individuals manage their supply chain operations, including transportation, warehousing, inventory management, and delivery. The app can be used by logistics companies, manufacturers, retailers, and wholesalers to streamline their operations and improve efficiency.',
    image: "/projects/o1.png",
    link: "",
  },
  {
    title: "Nrna Members",
    description:
      'An umbrella organization for Nepali Diaspora around the world, NRNA is a global network for people of Nepali origin, working to address their interests, concerns, and welfare.',
    image: "/projects/nr.png",
    link: "https://members.globalnrna.org/login",
  },
] as const;

export const PARTNERS = [
  {name:'Omlot Express', image:'/partners/omlot.png', link:''},
  {name:'Rooms24', image:'/partners/rooms24.jpg', link:''},
  { name:'The Healthhub Nepal', image:'/partners/health.png', link:'https://healthhubnepal.netlify.app/home'},
  {name:'Allpasal', image:'/partners/allpasal.jpg', link:'https://allpasal.com/'},
  {name:'GFL', image:'/partners/gfl.png', link:'https://demat.gurkhasfinance.com.np/'},
  {name:'NRNA', image:'/partners/nrna.png', link:'https://globalnrna.org/'},
  {name:'Khumbu', image:'/partners/khumbu.png', link:'https://trekcard.app/'},
  {name:'Affixlink', image:'/partners/affixlink.png', link:'https://admin.affixlink.app/dashboard/home'},
  {name:'NRNAA', image:'/partners/nrnaa.png', link:'https://members.globalnrna.org/login'},
] as const

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com/ewumesh",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/umeshthapa12",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com/ewumesh",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com/ewumesh",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com/ewumesh",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com/ewumesh",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://www.buymeacoffee.com/ewumesh",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "https://ewumesh.com",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:ewumesh@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Blogs",
    link: "/blogs",
  },
  {
    title: "News",
    link: "",
  },
  {
    title: "Contact",
    link: "",
  },
  {
    title: "Tools",
    link: "",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/umeshthapa12",
};
