import { BsArrowUpRight } from "react-icons/bs";
import { projects } from "../../data/projects";
import SectionHeading from "../ui/SectionHeading";
import FeaturedProjectCard from "../ui/FeaturedProjectCard";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";
import { personalInfo } from "../../data/personal";

export default function ProjectsSection() {
  const featuredProject = projects.find((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <Reveal>
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Selected work"
              title="Projects that highlight my full stack experience, backend architecture, and modern product development."
              className="max-w-4xl"
            />

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:hover:border-cyan-400 dark:hover:text-cyan-300 sm:px-5 sm:py-3"
            >
              More on GitHub <BsArrowUpRight />
            </a>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
            These projects reflect my work across full stack development,
            backend architecture, API design, database-driven applications, and
            polished user interfaces built with modern web technologies.
          </p>
        </>
      </Reveal>

      {featuredProject ? (
        <Reveal className="mt-8 sm:mt-12">
          <FeaturedProjectCard project={featuredProject} />
        </Reveal>
      ) : null}

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {regularProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
