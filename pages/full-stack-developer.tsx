import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import CtaSection from "../src/components/sections/CtaSection";
import Reveal from "../src/components/ui/Reveal";
import { useTheme } from "../src/hooks/use-theme";

const fullStackItems = [
  "Full stack web applications from idea to production",
  "Backend systems with APIs and business logic",
  "Frontend interfaces with React and Next.js",
  "Database-driven applications and reporting flows",
  "Authentication, integrations, and real product features",
  "Scalable architecture for modern web platforms",
];

const stackItems = [
  "Next.js",
  "React",
  "NestJS",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "MSSQL",
  "MongoDB",
  "Redis",
  "Azure",
];

const serviceItems = [
  {
    title: "Product Development",
    description:
      "From concept to production, I build web applications that combine clean UI, structured backend logic, and reliable data flows.",
  },
  {
    title: "Frontend & Backend Ownership",
    description:
      "I work across the full stack, connecting API architecture, database logic, and responsive interfaces into one coherent product.",
  },
  {
    title: "Production-Ready Systems",
    description:
      "My focus is not just on shipping features, but on building maintainable, scalable systems that work in real business environments.",
  },
];

const processItems = [
  "Translate product needs into technical structure",
  "Design backend modules and API flows",
  "Build responsive UI with reusable components",
  "Connect data, auth, and business logic",
  "Polish for maintainability, UX, and deployment",
];

export default function FullStackDeveloperPage() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>Full Stack Developer | Lazar Panović</title>
        <meta
          name="description"
          content="Full Stack Developer specialized in building modern web applications with strong backend systems, APIs, and polished frontend interfaces using React, Next.js, and NestJS."
        />
        <link
          rel="canonical"
          href="https://www.lazarpanovic.dev/full-stack-developer"
        />

        <meta
          property="og:title"
          content="Full Stack Developer | Lazar Panović"
        />
        <meta
          property="og:description"
          content="Full Stack Developer building modern web applications with scalable backend systems, APIs, and polished frontend experiences."
        />
        <meta
          property="og:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          property="og:image:alt"
          content="Lazar Panović - Full Stack Developer"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lazarpanovic.dev/full-stack-developer"
        />
        <meta property="og:site_name" content="Lazar Panović" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Full Stack Developer | Lazar Panović"
        />
        <meta
          name="twitter:description"
          content="Full Stack Developer building modern web applications with scalable backend systems, APIs, and polished frontend experiences."
        />
        <meta
          name="twitter:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="grid min-h-[calc(100vh-84px)] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
            <Reveal>
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                  Full Stack Development
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                  Full Stack Developer
                  <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    building complete web applications end-to-end
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8 lg:text-xl">
                  I design and build full stack applications, combining strong
                  backend systems with clean, responsive frontend interfaces.
                  From API architecture and database logic to modern UI
                  delivery, I focus on building real, production-ready products.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="tag">Frontend & Backend</span>
                  <span className="tag">APIs</span>
                  <span className="tag">React / Next.js</span>
                  <span className="tag">NestJS</span>
                  <span className="tag">Databases</span>
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
                  {fullStackItems.map((item, index) => (
                    <Reveal key={item}>
                      <div className="group rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-cyan-400/30">
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
                    Building complete products, not just features
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    Full stack development is about connecting everything:
                    backend, frontend, data, and user experience. I focus on
                    building systems that are maintainable, scalable, and
                    actually usable in real-world scenarios.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {serviceItems.map((item) => (
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
                  How I approach full stack product work
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                  My approach is product-oriented. I look at the full path from
                  user interface and product requirements to backend logic,
                  architecture, and maintainable implementation.
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
                  React, Next.js, NestJS, Node.js, TypeScript, PostgreSQL,
                  MSSQL, MongoDB, Redis, and cloud-ready tooling for modern web
                  applications.
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
