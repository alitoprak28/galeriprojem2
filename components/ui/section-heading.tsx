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
      <h2 className="headline-display mt-4 text-[2rem] font-semibold leading-[1.02] text-white sm:mt-5 sm:text-[2.5rem] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted sm:text-base md:text-lg">{description}</p>
    </div>
  );
}
