import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { personalInfo } from "../../data/personal";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

const mobileLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsExpanded(false);
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldExpand = !isScrolled || isExpanded || isMenuOpen;

  const toggleMobileExpand = () => {
    if (!isMobile || !isScrolled) return;
    setIsExpanded((prev) => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsExpanded(true);
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-x-0 top-4 z-[100] px-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto transition-all duration-300 ease-out ${
          shouldExpand ? "max-w-7xl" : isMobile ? "max-w-[220px]" : "max-w-3xl"
        }`}
        onMouseEnter={() => {
          if (!isMobile) setIsExpanded(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setIsExpanded(false);
        }}
      >
        <div className="relative">
          <nav
            onClick={toggleMobileExpand}
            className={`flex items-center rounded-full border shadow-sm backdrop-blur-xl transition-all duration-300 ${
              isScrolled
                ? "border-zinc-200/70 bg-white/65 px-4 py-2.5 shadow-lg dark:border-white/10 dark:bg-zinc-950/55"
                : "border-zinc-200 bg-white/85 px-4 py-3 dark:border-white/10 dark:bg-white/5"
            } ${shouldExpand ? "justify-between" : "justify-center md:justify-between"}`}
          >
            <Link
              href="/"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
              className={`shrink-0 text-lg font-semibold tracking-tight text-cyan-600 transition-all duration-300 dark:text-cyan-300 ${
                !shouldExpand && isMobile ? "text-center" : ""
              }`}
            >
              {personalInfo.brandName}
            </Link>

            <div
              className={`hidden items-center overflow-hidden transition-all duration-300 md:flex ${
                shouldExpand
                  ? "mx-8 max-w-xl gap-6 opacity-100"
                  : "pointer-events-none mx-0 max-w-0 gap-0 opacity-0"
              }`}
            >
              <Link href="/#about" className="nav-link">
                About
              </Link>
              <Link href="/#skills" className="nav-link">
                Skills
              </Link>
              <Link href="/#projects" className="nav-link">
                Projects
              </Link>
              <Link href="/blogs" className="nav-link">
                Blogs
              </Link>
              <Link href="/#contact" className="nav-link">
                Contact
              </Link>
            </div>

            <div
              className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
                shouldExpand
                  ? "max-w-[140px] opacity-100"
                  : "pointer-events-none max-w-0 opacity-0 md:pointer-events-auto md:max-w-[140px] md:opacity-100"
              }`}
            >
              <button
                aria-label="Toggle theme"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTheme();
                }}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition hover:-translate-y-0.5 hover:shadow-md ${
                  isScrolled
                    ? "border-zinc-200/70 bg-white/70 text-zinc-700 dark:border-white/10 dark:bg-white/10 dark:text-yellow-300"
                    : "border-zinc-200 bg-white text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-yellow-300"
                }`}
              >
                {isDark ? <BsSun /> : <BsFillMoonStarsFill />}
              </button>

              <button
                aria-label="Toggle menu"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu();
                }}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition hover:-translate-y-0.5 hover:shadow-md md:hidden ${
                  isScrolled
                    ? "border-zinc-200/70 bg-white/70 text-zinc-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
                    : "border-zinc-200 bg-white text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
                }`}
              >
                {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
              </button>
            </div>
          </nav>

          <div
            className={`absolute left-0 right-0 top-[calc(100%+12px)] z-50 origin-top transition-all duration-300 md:hidden ${
              isMenuOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="bg-white/92 dark:bg-zinc-950/88 rounded-[1.75rem] border border-zinc-200/80 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10">
              <div className="grid gap-3">
                {mobileLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center text-base font-semibold text-zinc-700 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:text-cyan-600 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                    }}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
