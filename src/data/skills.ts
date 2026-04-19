import {
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiTailwindcss,
  SiChakraui,
  SiAntdesign,
  SiDocker,
  SiDigitalocean,
  SiFigma,
  SiGit,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";
import { SkillGroup } from "../types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Front-end",
    description:
      "Modern interfaces, reusable components, design systems, and app UX.",
    items: [
      { label: "React", icon: SiReact },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "TypeScript", icon: SiTypescript },
      { label: "JavaScript", icon: SiJavascript },
      { label: "Tailwind", icon: SiTailwindcss },
      { label: "Chakra UI", icon: SiChakraui },
      { label: "Ant Design", icon: SiAntdesign },
    ],
  },
  {
    title: "Back-end",
    description:
      "API development, business logic, integrations, and database-driven systems.",
    items: [
      { label: "NestJS", icon: SiNestjs },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "MSSQL", icon: DiMsqlServer },
      { label: "Git", icon: SiGit },
      { label: "Docker", icon: SiDocker },
    ],
  },
  {
    title: "Cloud & workflow",
    description:
      "Deployment, infrastructure, internal tools, and product delivery.",
    items: [
      { label: "Azure", icon: VscAzure },
      { label: "DigitalOcean", icon: SiDigitalocean },
      { label: "Figma", icon: SiFigma },
    ],
  },
];
