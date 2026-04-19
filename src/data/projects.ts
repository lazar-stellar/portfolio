import mwmockup from "../../public/mwmockup.png";
import ebankmockup from "../../public/ebankmockup.png";
import stopwatchmockup from "../../public/stopwatchmockup.png";
import spinmockup from "../../public/spinmockup.png";
import { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    title: "Personal Finance Dashboard",
    description:
      "A modern personal finance dashboard built with a focus on clean UI, data visualization, and intuitive user experience. Features include expense tracking, category insights, and a responsive layout optimized for both desktop and mobile devices.",
    image: ebankmockup,
    href: "https://finance-tracker.lazarpanovic.dev/",
    tags: [
      "React",
      "Dashboard UI",
      "Data Visualization",
      "Responsive Design",
      "NestJS",
      "PostgreSQL",
      "Full Stack",
      "REST API",
    ],
    featured: true,
    category: "Featured project",
  },
  {
    title: "Modern E-Banking",
    description:
      "A modern banking dashboard concept focused on clean financial UI, reusable layout patterns, responsive structure, and a polished product feel across desktop and mobile.",
    image: ebankmockup,
    href: "https://lazar-ebanking.netlify.app/",
    tags: ["React", "Dashboard UI", "Responsive Design"],
    category: "Client-style website",
  },
  {
    title: "MW Concept",
    description:
      "A business website built with a strong emphasis on visual presentation, responsive behavior, and a clean user journey tailored to a professional brand presence.",
    image: mwmockup,
    href: "https://mw-concept.net/",
    tags: ["Website", "Brand UI", "Responsive"],
    category: "Client-style website",
  },
  {
    title: "Stopwatch Game",
    description:
      "An interactive browser-based project built around timing logic, user feedback, and simple game mechanics, with a responsive interface across screen sizes.",
    image: stopwatchmockup,
    href: "https://laki-stopwatch-game.netlify.app/",
    tags: ["JavaScript", "Game Logic", "Responsive UI"],
    category: "Interactive project",
  },
  {
    title: "Lucky Spin",
    description:
      "A playful front-end experience that explores animation, event handling, and lightweight browser-based interaction through a simple game concept.",
    image: spinmockup,
    href: "https://laki-spin.netlify.app/",
    tags: ["Animation", "JavaScript", "Interaction"],
    category: "Interactive project",
  },
];
