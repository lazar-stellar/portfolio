import { ReactNode, useEffect, useState } from "react";
import { useReveal } from "../../hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className = "" }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 ključni deo: dok nije mountovano, NE menjaj className
  const visible = mounted && isVisible;

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
