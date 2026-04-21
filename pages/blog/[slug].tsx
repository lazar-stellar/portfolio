import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { useMemo } from "react";
import Navbar from "../../src/components/layout/Navbar";
import Footer from "../../src/components/layout/Footer";
import Reveal from "../../src/components/ui/Reveal";
import { useTheme } from "../../src/hooks/use-theme";
import { blogPosts, BlogPost } from "../../src/data/blogs";

type BlogPostPageProps = {
  post: BlogPost;
};

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

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
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
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:px-8 lg:px-10">
          <div className="py-12 sm:py-16 lg:py-20">
            <Reveal>
              <div className="max-w-4xl">
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

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg sm:leading-8">
                  {post.content.intro}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 space-y-12">
              {post.content.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
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
                      <ul className="mt-6 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
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
