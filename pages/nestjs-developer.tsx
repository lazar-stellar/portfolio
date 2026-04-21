import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import CtaSection from "../src/components/sections/CtaSection";
import Reveal from "../src/components/ui/Reveal";
import { useTheme } from "../src/hooks/use-theme";

const nestItems = [
  "REST APIs and backend services",
  "Authentication and authorization systems",
  "Database-driven business applications",
  "Reporting modules and platform integrations",
  "Queue-based processing and background jobs",
  "Scalable backend architecture for web products",
];

const stackItems = [
  "NestJS",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "MSSQL",
  "Redis",
  "Bull",
  "Azure",
  "REST APIs",
  "TypeORM",
];

export default function NestjsDeveloperPage() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>NestJS Developer | Lazar Panović</title>
        <meta
          name="description"
          content="NestJS Developer specialized in scalable backend systems, API development, database-driven applications, and modern full stack products."
        />
        <link
          rel="canonical"
          href="https://www.lazarpanovic.dev/nestjs-developer"
        />

        <meta property="og:title" content="NestJS Developer | Lazar Panović" />
        <meta
          property="og:description"
          content="NestJS Developer specialized in scalable backend systems, API development, database-driven applications, and modern full stack products."
        />
        <meta
          property="og:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          property="og:image:alt"
          content="Lazar Panović - NestJS Developer"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lazarpanovic.dev/nestjs-developer"
        />
        <meta property="og:site_name" content="Lazar Panović" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NestJS Developer | Lazar Panović" />
        <meta
          name="twitter:description"
          content="NestJS Developer specialized in scalable backend systems, API development, database-driven applications, and modern full stack products."
        />
        <meta
          name="twitter:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          name="twitter:image:alt"
          content="Lazar Panović - NestJS Developer"
        />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="grid min-h-[calc(100vh-84px)] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[calc(100vh-110px)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-20">
            <Reveal>
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                  Backend Development
                </span>

                <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                  NestJS Developer
                  <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    building scalable backend systems and modern APIs
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8 lg:text-xl">
                  I build backend applications with NestJS, TypeScript,
                  PostgreSQL, MSSQL, Redis, and queue-based workflows. My focus
                  is on API architecture, business logic, authentication,
                  reporting flows, and database-driven systems that support real
                  products.
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                  <span className="tag">NestJS</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">REST APIs</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">MSSQL</span>
                  <span className="tag">Redis / Bull</span>
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

            <Reveal className="mt-12 lg:mt-0">
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                  What I build with NestJS
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {nestItems.map((item, index) => (
                    <Reveal key={item}>
                      <div className="group relative overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900 dark:hover:border-cyan-400/30">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                          {String(index + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
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
                <div className="max-w-4xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                    Core focus
                  </p>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Backend systems built for real business use cases
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    My work with NestJS is not just about writing endpoints. I
                    focus on building maintainable systems that handle business
                    logic, database interactions, reporting workflows,
                    authentication, and integrations that support internal tools
                    and client-facing platforms.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-xl font-semibold">API Design</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      Clean, scalable API structures with strong validation,
                      maintainable modules, and predictable data flow.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-xl font-semibold">
                      Data &amp; Business Logic
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      Database-driven applications with TypeORM, reporting
                      flows, domain logic, and performance-conscious backend
                      design.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-xl font-semibold">
                      Production Workflows
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      Authentication, queue processing, integrations, and
                      deployment workflows for modern full stack products.
                    </p>
                  </div>
                </div>
              </>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
          <Reveal>
            <>
              <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                  Tech stack
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Technologies I use with NestJS
                </h2>

                <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                  NestJS, Node.js, TypeScript, PostgreSQL, MSSQL, Redis, Bull,
                  Azure, Next.js, and modern tooling for full stack product
                  development.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {stackItems.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </>
          </Reveal>
        </section>

        <CtaSection />
        <Footer currentYear={currentYear} />
      </main>
    </div>
  );
}
