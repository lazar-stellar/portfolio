import { skillGroups } from "../../data/skills";
import SectionHeading from "../ui/SectionHeading";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10"
    >
      <SectionHeading
        label="Skills & stack"
        title="Technologies I use to design, build, and ship modern web applications."
        className="max-w-3xl"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-2xl font-semibold">{group.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {group.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    <Icon className="text-base text-cyan-600 dark:text-cyan-300" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
