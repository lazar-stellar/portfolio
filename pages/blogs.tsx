import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import Reveal from "../src/components/ui/Reveal";
import { useTheme } from "../src/hooks/use-theme";
import { blogPosts } from "../src/data/blogs";

export default function BlogsPage() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>Blogs | Lazar Panović</title>
        <meta
          name="description"
          content="Articles on NestJS, backend systems, full stack development, and database-driven applications by Lazar Panović."
        />
        <link rel="canonical" href="https://www.lazarpanovic.dev/blogs" />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="py-12 sm:py-16 lg:py-20">
            <Reveal>
              <div className="max-w-5xl">
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                  Blog
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                  Articles on backend systems,
                  <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    full stack development, and real product work
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8 lg:text-xl">
                  A small collection of practical articles based on the kind of
                  backend and full stack work I enjoy building.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6">
              {blogPosts.map((post) => (
                <Reveal key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                        {post.category}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {post.date}
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold tracking-tight transition group-hover:text-cyan-600 dark:group-hover:text-cyan-300 sm:text-3xl">
                      {post.title}
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                      Read article →
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Footer currentYear={currentYear} />
      </main>
    </div>
  );
}
