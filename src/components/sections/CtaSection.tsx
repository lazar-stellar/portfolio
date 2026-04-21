import { AiOutlineArrowRight, AiOutlineCloudDownload } from "react-icons/ai";
import Reveal from "../ui/Reveal";
import { personalInfo } from "../../data/personal";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-white p-6 shadow-sm dark:border-cyan-400/20 dark:bg-gradient-to-br dark:from-cyan-400/10 dark:via-white/5 dark:to-white/5 sm:rounded-[2rem] sm:p-8 lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-400/10" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-400/10" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300 sm:text-sm">
              Let’s build something great
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Available for full-time roles, freelance work, and product-focused
              collaborations.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              I enjoy working on modern web products where strong backend
              architecture, clean front-end delivery, and real business value
              all matter. If you’re building something meaningful, I’d love to
              hear more about it.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3">
              <span className="tag">Full stack development</span>
              <span className="tag">Backend systems</span>
              <span className="tag">React / Next.js</span>
              <span className="tag">NestJS / APIs</span>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/#contact"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900 sm:min-w-[210px] sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
              >
                Get in touch <AiOutlineArrowRight />
              </Link>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300 sm:min-w-[210px] sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
              >
                Download resume <AiOutlineCloudDownload />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
