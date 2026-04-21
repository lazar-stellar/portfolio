import Head from "next/head";
import { useMemo } from "react";
import Footer from "../src/components/layout/Footer";
import Navbar from "../src/components/layout/Navbar";
import AboutSection from "../src/components/sections/AboutSection";
import ContactSection from "../src/components/sections/ContactSection";
import ExperienceSection from "../src/components/sections/ExperienceSection";
import HeroSection from "../src/components/sections/HeroSection";
import ProjectsSection from "../src/components/sections/ProjectsSection";
import SkillsSection from "../src/components/sections/SkillsSection";
import { useTheme } from "../src/hooks/use-theme";
import { personalInfo } from "../src/data/personal";
import CtaSection from "../src/components/sections/CtaSection";

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lazar Panović",
    url: "https://www.lazarpanovic.dev/",
    image: "https://www.lazarpanovic.dev/og.png",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specialized in NestJS, Node.js, Next.js, and scalable backend systems.",
    sameAs: [
      "https://www.linkedin.com/in/lazar-panovi%C4%87-252160209/",
      "https://github.com/Lazarpanovic",
    ],
    knowsAbout: [
      "NestJS",
      "Node.js",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Microsoft SQL Server",
      "REST API Development",
      "Backend Development",
      "Full Stack Development",
    ],
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>
          Lazar Panović | Full Stack Developer | NestJS, Node.js, Next.js
        </title>

        <meta
          name="description"
          content="Full Stack Developer specialized in NestJS, Node.js, Next.js, and scalable backend systems. Building APIs, database-driven applications, and modern web platforms."
        />

        <link rel="canonical" href="https://www.lazarpanovic.dev/" />

        <meta
          property="og:title"
          content="Lazar Panović | Full Stack Developer | NestJS, Node.js, Next.js"
        />
        <meta
          property="og:description"
          content="Full Stack Developer specialized in NestJS, Node.js, Next.js, and scalable backend systems. Building APIs, database-driven applications, and modern web platforms."
        />
        <meta
          property="og:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          property="og:image:alt"
          content="Lazar Panović - Full Stack Developer portfolio"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lazarpanovic.dev/" />
        <meta property="og:site_name" content="Lazar Panović" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lazar Panović | Full Stack Developer | NestJS, Node.js, Next.js"
        />
        <meta
          name="twitter:description"
          content="Full Stack Developer specialized in NestJS, Node.js, Next.js, and scalable backend systems. Building APIs, database-driven applications, and modern web platforms."
        />
        <meta
          name="twitter:image"
          content="https://www.lazarpanovic.dev/og.png"
        />
        <meta
          name="twitter:image:alt"
          content="Lazar Panović - Full Stack Developer portfolio"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>

      <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-10">
          <Navbar
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onScrollToSection={scrollToSection}
          />
          <HeroSection onScrollToSection={scrollToSection} />
        </section>

        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CtaSection onScrollToSection={scrollToSection} />
        <ContactSection />
        <Footer currentYear={currentYear} />
      </main>
    </div>
  );
}
