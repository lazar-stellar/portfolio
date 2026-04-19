import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { personalInfo } from "../../data/personal";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onScrollToSection: (id: string) => void;
};

export default function Navbar({
  isDark,
  onToggleTheme,
  onScrollToSection,
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between rounded-full border border-zinc-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <button
        onClick={() => onScrollToSection("hero")}
        className="text-lg font-semibold tracking-tight text-cyan-600 dark:text-cyan-300"
      >
        {personalInfo.brandName}
      </button>

      <div className="hidden items-center gap-6 md:flex">
        <button onClick={() => onScrollToSection("about")} className="nav-link">
          About
        </button>
        <button onClick={() => onScrollToSection("skills")} className="nav-link">
          Skills
        </button>
        <button
          onClick={() => onScrollToSection("projects")}
          className="nav-link"
        >
          Projects
        </button>
        <button
          onClick={() => onScrollToSection("contact")}
          className="nav-link"
        >
          Contact
        </button>
      </div>

      <button
        aria-label="Toggle theme"
        onClick={onToggleTheme}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl text-zinc-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-yellow-300"
      >
        {isDark ? <BsSun /> : <BsFillMoonStarsFill />}
      </button>
    </nav>
  );
}