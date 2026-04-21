import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { Project } from "../../types/portfolio";

type FeaturedProjectCardProps = {
  project: Project;
};

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-zinc-200 bg-zinc-100 p-5 dark:border-white/10 dark:bg-zinc-900/60 lg:border-b-0 lg:border-r">
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white px-6 py-10 dark:bg-zinc-950">
            {/* Laptop */}
            <Image
              src="/personal-finance-laptop.png"
              alt="Laptop view"
              width={1100}
              height={700}
              className="w-full max-w-[760px] object-contain transition duration-500 group-hover:scale-[1.02]"
              priority
            />

            {/* Phone */}
            <Image
              src="/personal-finance-mobile.png"
              alt="Mobile view"
              width={400}
              height={800}
              className="xs:w-[230px] absolute bottom-[10%] right-[-15%] z-10 w-[200px] object-contain drop-shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-[-6deg] group-hover:scale-[1.05] sm:w-[350px] md:bottom-[6%] md:right-[-5%] md:w-[440px] lg:bottom-[5%] lg:right-[-10%] lg:w-[340px]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                {project.category || "Featured"}
              </span>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Live project <BsArrowUpRight />
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>

            <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-300">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition group-hover:text-cyan-600 dark:text-cyan-300 dark:group-hover:text-cyan-200">
            View featured project <BsArrowUpRight />
          </div>
        </div>
      </div>
    </a>
  );
}
