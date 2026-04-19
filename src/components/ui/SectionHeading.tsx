type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
