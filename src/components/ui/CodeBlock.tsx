import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { HiCheck, HiOutlineClipboard } from "react-icons/hi2";
import { useTheme } from "../../hooks/use-theme";

type CodeBlockProps = {
  code: string;
  label?: string;
  language?: string;
};

export default function CodeBlock({
  code,
  label,
  language = "tsx",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const activeTheme = isDark ? themes.vsDark : themes.github;

  return (
    <div className="max-w-full overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-50 shadow-sm dark:border-white/10 dark:from-zinc-950 dark:to-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {label ?? language}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-600 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <HiCheck className="text-sm" />
                Copied
              </>
            ) : (
              <>
                <HiOutlineClipboard className="text-sm" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto text-sm">
        <Highlight
          theme={activeTheme}
          code={code.trim()}
          language={language as never}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} min-w-full px-4 py-4 text-[12px] leading-5 sm:px-5 sm:py-5 sm:text-sm sm:leading-7`}
              style={{
                ...style,
                margin: 0,
                background: "transparent",
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
