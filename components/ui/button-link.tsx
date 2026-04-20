import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  const classNames = cn(
    "inline-flex max-w-full items-center justify-center rounded-full px-5 py-3 text-center text-sm font-medium transition duration-300",
    variant === "primary" &&
      "bg-accent text-black shadow-glow hover:-translate-y-0.5 hover:brightness-110",
    variant === "secondary" &&
      "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
    variant === "ghost" &&
      "text-white/80 hover:bg-white/5 hover:text-white",
    className,
  );

  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={classNames}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
