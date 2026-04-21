import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../../src/components/layout/Navbar";
import Footer from "../../src/components/layout/Footer";
import Reveal from "../../src/components/ui/Reveal";
import { useTheme } from "../../src/hooks/use-theme";
import { blogPosts, BlogPost } from "../../src/data/blogs";
import CodeBlock from "../../src/components/ui/CodeBlock";

type BlogPostPageProps = {
  post: BlogPost;
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    author: {
      "@type": "Person",
      name: "Lazar Panović",
    },
    datePublished: post.date,
    image: "https://www.lazarpanovic.dev/og.png",
  };

  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const headingIds = post.content.sections.map((section) =>
      slugifyHeading(section.heading),
    );

    const headings = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const updateActiveSection = () => {
      const targetLine = 160;
      let currentId = headings[0].id;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top - targetLine);

        if (rect.top <= targetLine && distance < smallestDistance) {
          smallestDistance = distance;
          currentId = heading.id;
        }
      }

      setActiveSection(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [post]);

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="article:author" content="Lazar Panović" />
        <meta property="article:section" content={post.category} />
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <link
          rel="canonical"
          href={`https://www.lazarpanovic.dev/blog/${post.slug}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="py-12 sm:py-16 lg:py-20">
            <Reveal>
              <div className="mx-auto max-w-5xl">
                <Link
                  href="/blogs"
                  className="text-sm font-semibold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  ← Back to blogs
                </Link>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
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

                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8">
                  {post.content.intro}
                </p>
              </div>
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.78fr)_0.22fr] lg:gap-12">
              <div className="min-w-0 space-y-10">
                {post.content.sections.map((section) => (
                  <Reveal key={section.heading}>
                    <section className="min-w-0 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                      <h2
                        id={slugifyHeading(section.heading)}
                        className="scroll-mt-32 text-2xl font-bold tracking-tight sm:text-3xl"
                      >
                        {section.heading}
                      </h2>

                      <div className="mt-5 space-y-4">
                        {section.paragraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.bullets?.length ? (
                        <div className="mt-6 grid gap-3">
                          {section.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
                            >
                              {bullet}
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {section.codeBlocks?.length ? (
                        <div className="mt-8 space-y-5">
                          {section.codeBlocks.map((block, index) => (
                            <CodeBlock
                              key={`${block.label ?? block.language}-${index}`}
                              code={block.code}
                              label={block.label}
                              language={block.language}
                            />
                          ))}
                        </div>
                      ) : null}
                    </section>
                  </Reveal>
                ))}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">
                    On this page
                  </p>

                  <div className="relative mt-5 pl-4">
                    <div className="absolute bottom-0 left-[7px] top-0 w-px bg-zinc-200 dark:bg-white/10" />

                    <div className="flex flex-col gap-2">
                      {post.content.sections.map((section) => {
                        const sectionId = slugifyHeading(section.heading);
                        const isActive = activeSection === sectionId;

                        return (
                          <a
                            key={section.heading}
                            href={`#${sectionId}`}
                            className={`group relative rounded-xl py-2 pl-5 pr-3 text-sm leading-6 transition ${
                              isActive
                                ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300"
                                : "text-zinc-600 hover:bg-zinc-100 hover:text-cyan-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-cyan-300"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-4 h-3 w-3 rounded-full border transition-all duration-300 ${
                                isActive
                                  ? "scale-110 border-cyan-500 bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.12)] dark:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
                                  : "border-zinc-300 bg-white group-hover:border-cyan-400 dark:border-white/20 dark:bg-zinc-950"
                              }`}
                            />
                            {section.heading}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <Reveal>
              <div className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-white p-6 shadow-sm dark:border-cyan-400/20 dark:from-cyan-400/10 dark:via-white/5 dark:to-white/5 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Continue exploring
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  More articles and full stack work
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                  If this article was useful, you can also explore more writing
                  on backend architecture, database-driven applications, and
                  full stack product development.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900"
                  >
                    View all blogs
                  </Link>

                  <Link
                    href="/full-stack-developer"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                  >
                    Full stack page
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer currentYear={currentYear} />
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (
  context,
) => {
  const slug = context.params?.slug;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
