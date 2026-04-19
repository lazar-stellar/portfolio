import { experienceItems } from "../../data/experience";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function ExperienceSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <>
            <SectionHeading
              label="Experience"
              title="Professional experience and growth over the past few years."
              className="max-w-4xl"
            />

            <div className="relative mt-8 sm:mt-12">
              <div className="absolute left-3 top-0 hidden h-full w-px bg-zinc-200 dark:bg-white/10 lg:block" />

              <div className="space-y-4 sm:space-y-6">
                {experienceItems.map((item) => (
                  <div
                    key={`${item.period}-${item.title}`}
                    className="relative lg:pl-14"
                  >
                    <div className="absolute left-0 top-8 hidden h-7 w-7 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 shadow-sm dark:border-cyan-400/20 dark:bg-zinc-950 dark:text-cyan-300 lg:flex">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 dark:bg-cyan-300" />
                    </div>

                    <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem]">
                      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-zinc-900/40 sm:px-6">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-semibold sm:text-2xl">
                              {item.title}
                            </h3>

                            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300 sm:text-xs">
                              {item.period}
                            </span>
                          </div>

                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 sm:text-sm">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                          {item.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        </Reveal>
      </div>
    </section>
  );
}
