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

  return (
    <div className={isDark ? "dark" : ""}>
      <Head>
        <title>Lazar Panović | Full Stack Developer</title>

        <meta
          name="description"
          content="Full stack developer focused on backend systems, scalable APIs, and modern web applications."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Lazar Panović | Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Full stack developer focused on backend systems, scalable APIs, and modern web applications."
        />
        <meta
          property="og:image"
          content="https://laki-portfolio.vercel.app/og.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lazar Panović | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Full stack developer focused on backend systems, scalable APIs, and modern web applications."
        />
        <meta
          name="twitter:image"
          content="https://laki-portfolio.vercel.app/og.png"
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
