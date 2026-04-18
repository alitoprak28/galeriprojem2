interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="headline-display mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted md:text-lg">{description}</p>
    </div>
  );
}
