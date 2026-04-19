type FooterProps = {
  currentYear: number;
};

export default function Footer({ currentYear }: FooterProps) {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-zinc-500 dark:text-zinc-400 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-8 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Lazar Panović. All rights reserved.</p>
        <p>Designed and developed with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
