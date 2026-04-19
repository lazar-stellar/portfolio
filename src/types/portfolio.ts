import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

export type Project = {
  title: string;
  description: string;
  image: StaticImageData;
  href: string;
  tags: string[];
  featured?: boolean;
  category?: string;
};

export type SkillItem = {
  label: string;
  icon: IconType;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: SkillItem[];
};

export type ExperienceItem = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};
