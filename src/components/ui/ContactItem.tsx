import { IconType } from "react-icons";

type ContactItemProps = {
  href: string;
  label: string;
  icon: IconType;
  external?: boolean;
};

export default function ContactItem({
  href,
  label,
  icon: Icon,
  external = false,
}: ContactItemProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 text-zinc-700 transition hover:text-cyan-600 dark:text-zinc-200 dark:hover:text-cyan-300"
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      <span className="font-medium">{label}</span>

      <span className="contact-icon">
        <Icon />
      </span>
    </a>
  );
}
