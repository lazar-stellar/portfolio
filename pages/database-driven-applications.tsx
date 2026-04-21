import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import CtaSection from "../src/components/sections/CtaSection";
import Reveal from "../src/components/ui/Reveal";
import { useTheme } from "../src/hooks/use-theme";

const dbItems = [
  "Database-driven business applications",
  "Complex reporting systems and data workflows",
  "Data modeling and relational schema design",
  "Optimized queries and performance tuning",
  "Integration of multiple data sources",
  "Backend logic built around real data flows",
];

const stackItems = [
  "PostgreSQL",
  "MSSQL",
  "MongoDB",
  "TypeORM",
  "SQL",
  "Database Design",
  "Query Optimization",
  "Reporting",
  "Data Modeling",
];

const focusItems = [
  {
    title: "Data Modeling",
    description:
      "I design structured schemas and application data models that support real business rules, reporting, and long-term maintainability.",
  },
  {
    title: "Reporting Workflows",
    description:
      "I build systems where data is not just stored, but transformed into useful outputs through reports, summaries, dashboards, and business views.",
  },
  {
    title: "Performance & Logic",
    description:
      "I focus on query structure, relational integrity, and backend logic so database-driven applications stay reliable as complexity grows.",
  },
];

const processItems = [
  "Model entities and data relationships around real business needs",
  "Build backend logic that reflects how data moves through the product",
  "Create queries, reports, and summaries that support operations",
  "Optimize for maintainability, correctness, and performance",
];

export default function DatabasePage() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>Database Driven Applications | Lazar Panović</title>
        <meta
          name="description"
          content="Building database-driven applications with strong data modeling, reporting systems, and backend logic using PostgreSQL, MSSQL, and modern backend technologies."
        />
        <link
          rel="canonical"
          href="https://www.lazarpanovic.dev/database-driven-applications"
        />

        <meta
          property="og:title"
          content="Database Driven Applications | Lazar Panović"
        />
        <meta
          property="og:description"
          content="Database-driven applications, reporting systems, and backend logic built on real data workflows."
        />
        <meta
          property="og:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          property="og:image:alt"
          content="Lazar Panović - Database Driven Applications"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lazarpanovic.dev/database-driven-applications"
        />
        <meta property="og:site_name" content="Lazar Panović" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Database Driven Applications | Lazar Panović"
        />
        <meta
          name="twitter:description"
          content="Database-driven applications, reporting systems, and backend logic built on real data workflows."
        />
        <meta
          name="twitter:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="grid min-h-[calc(100vh-84px)] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-20">
            <Reveal>
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                  Data & Backend
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                  Database Driven Applications
                  <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    built on real data, logic, and performance
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8 lg:text-xl">
                  I design and build applications where data is the core of the
                  system. From database modeling and queries to reporting flows
                  and backend logic, I focus on building systems that are
                  reliable, scalable, and efficient.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="tag">SQL</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">MSSQL</span>
                  <span className="tag">Reporting</span>
                  <span className="tag">Data Modeling</span>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/#projects"
                    className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900"
                  >
                    View projects
                  </Link>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                  What I build
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {dbItems.map((item, index) => (
                    <Reveal key={item}>
                      <div className="group rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-cyan-400/30">
                        <p className="text-xs font-semibold text-cyan-500">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 leading-7 text-zinc-700 dark:text-zinc-200">
                          {item}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-white/70 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                    Core focus
                  </p>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    Systems where data is central to how the product works
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    Database-driven applications are more than forms and tables.
                    They depend on strong schemas, consistent business logic,
                    reporting flows, and backend architecture that respects how
                    real data behaves inside the product.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {focusItems.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                  Workflow
                </p>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  How I approach database-heavy application work
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                  My process starts from the shape of the data and the business
                  rules behind it. That usually leads into schema design,
                  backend flows, query structure, reporting requirements, and
                  application performance.
                </p>

                <div className="mt-8 space-y-3">
                  {processItems.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-4 shadow-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                  Tech stack
                </p>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Technologies I use
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                  PostgreSQL, MSSQL, MongoDB, TypeORM, SQL, reporting-oriented
                  query design, and backend application logic built around real
                  data flows.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {stackItems.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <CtaSection />
        <Footer currentYear={currentYear} />
      </main>
    </div>
  );
}
