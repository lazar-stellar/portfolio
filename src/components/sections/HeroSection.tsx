import Image from "next/image";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineArrowRight,
  AiOutlineCloudDownload,
  AiOutlineMail,
} from "react-icons/ai";
import laki from "../../../public/laki.png";
import { personalInfo } from "../../data/personal";

type HeroSectionProps = {
  onScrollToSection: (id: string) => void;
};

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <div
      id="hero"
      className="grid min-h-[calc(100vh-84px)] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[calc(100vh-110px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20"
    >
      <div>
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 sm:px-4 sm:py-2 sm:text-sm">
          {personalInfo.title}
        </span>

        <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.02] tracking-tight sm:mt-6 sm:text-5xl lg:text-7xl">
          I build web applications with
          <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            strong backend systems and polished frontend experiences.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
          {personalInfo.shortIntro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
          <span className="tag">3+ years</span>
          <span className="tag">NestJS & APIs</span>
          <span className="tag">React / Next.js</span>
          <span className="tag">SQL databases</span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <button
            onClick={() => onScrollToSection("projects")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900 sm:rounded-full sm:px-6 sm:py-3 sm:text-base"
          >
            View projects <AiOutlineArrowRight />
          </button>

          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300 sm:rounded-full sm:px-6 sm:py-3 sm:text-base"
          >
            Resume <AiOutlineCloudDownload />
          </a>

          <button
            onClick={() => onScrollToSection("contact")}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300 sm:rounded-full sm:px-6 sm:py-3 sm:text-base"
          >
            Let’s work together
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-zinc-600 dark:text-zinc-300 sm:mt-10 sm:gap-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <AiFillGithub />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="social-link"
            aria-label="Email"
          >
            <AiOutlineMail />
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-md">
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent blur-3xl dark:from-cyan-400/20 dark:via-blue-400/20" />

        <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:p-5 lg:p-6">
          <div className="rounded-[1.2rem] bg-gradient-to-br from-cyan-400 to-blue-600 p-1 sm:rounded-[1.5rem]">
            <div className="rounded-[1rem] bg-zinc-100 p-4 dark:bg-zinc-900 sm:rounded-[1.35rem] sm:p-6">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-cyan-300 to-blue-500 p-2 shadow-lg sm:h-56 sm:w-56 lg:h-72 lg:w-72">
                <Image
                  src={laki}
                  alt={personalInfo.name}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </div>

              <div className="mt-5 space-y-3 text-center sm:mt-6">
                <p className="text-xl font-semibold sm:text-2xl">
                  {personalInfo.name}
                </p>

                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 sm:text-sm sm:tracking-[0.2em]">
                  NestJS · React · Next.js · SQL
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-1 text-xs text-zinc-600 dark:text-zinc-300 sm:pt-2 sm:text-sm">
                  <span className="tag">Backend-focused</span>
                  <span className="tag">Responsive UI</span>
                  <span className="tag">APIs</span>
                  <span className="tag">Cloud workflows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
