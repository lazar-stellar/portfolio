import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-y border-zinc-200 bg-white/70 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
            <div>
              <SectionHeading
                label="About me"
                title="Full stack developer focused on backend systems, product thinking, and modern web experiences."
                className="max-w-4xl"
              />

              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
                <div className="rounded-[1.25rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.75rem] sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 sm:text-sm">
                    Backend first mindset
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    I build scalable backend systems using Node.js, NestJS, and
                    TypeORM, with hands-on experience designing APIs, handling
                    business logic, and working with PostgreSQL, MSSQL, and
                    MongoDB.
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.75rem] sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 sm:text-sm">
                    Strong product UI sense
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    On the frontend, I work with React and Next.js to create
                    responsive, polished interfaces with clean structure and
                    strong attention to detail.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[1.25rem] border border-cyan-200 bg-white p-5 shadow-sm dark:border-cyan-400/20 dark:bg-white/5 sm:rounded-[1.75rem] sm:p-6">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 sm:text-sm">
                    Current work
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200 sm:text-base sm:leading-8">
                    Right now, I work on an internal app in the travel industry
                    and a billing platform for an external client, contributing
                    across backend architecture, APIs, database logic, and
                    front-end delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
              <div className="info-card">
                <p className="info-label">Focus</p>
                <p className="info-value">Full stack web apps</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Product-oriented development with strong backend ownership and
                  polished frontend delivery.
                </p>
              </div>

              <div className="info-card">
                <p className="info-label">Frontend</p>
                <p className="info-value">
                  React, Next.js, Tailwind, Chakra UI
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Building responsive, component-driven interfaces with clean UX
                  and attention to detail.
                </p>
              </div>

              <div className="info-card">
                <p className="info-label">Backend</p>
                <p className="info-value">
                  NestJS, TypeORM, PostgreSQL, MSSQL, MongoDB
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  APIs, data modeling, reporting flows, authentication, and
                  scalable application logic.
                </p>
              </div>

              <div className="info-card">
                <p className="info-label">Workflow</p>
                <p className="info-value">Azure, Git, Jira, Agile / Scrum</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Comfortable with deployment workflows, collaboration, and
                  day-to-day product development processes.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
