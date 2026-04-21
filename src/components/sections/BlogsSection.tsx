import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { blogPosts } from "../../data/blogs";

export default function BlogsSection() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

  return (
    <section
      id="blogs"
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <Reveal>
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Blog"
              title="Short articles on backend systems, full stack development, and database-driven applications."
              className="max-w-4xl"
            />

            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:hover:border-cyan-400 dark:hover:text-cyan-300 sm:px-5 sm:py-3"
            >
              View all blogs <BsArrowUpRight />
            </Link>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
            I write about practical backend architecture, full stack product
            work, and what I learn while building modern web applications.
          </p>
        </>
      </Reveal>

      <Reveal className="mt-8 sm:mt-12">
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
              Featured
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {featuredPost.category}
            </span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {featuredPost.readingTime}
            </span>
          </div>

          <h3 className="mt-5 max-w-3xl text-2xl font-bold tracking-tight transition group-hover:text-cyan-600 dark:group-hover:text-cyan-300 sm:text-3xl">
            {featuredPost.title}
          </h3>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
            {featuredPost.excerpt}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
            Read article <BsArrowUpRight />
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
