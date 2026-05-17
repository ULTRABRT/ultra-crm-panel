import type { HTMLAttributes } from "react";

import { ArqonEmblem } from "./ArqonEmblem";
import { ArqonWordmark } from "./ArqonWordmark";

type ArqonLockupProps = HTMLAttributes<HTMLDivElement> & {
  emblemSize?: number | string;
  label?: string;
  variant?: "dark" | "light";
};

export function ArqonLockup({
  className = "",
  emblemSize = 36,
  label = "Arqon",
  variant = "dark",
  ...props
}: ArqonLockupProps) {
  return (
    <div
      aria-label={label}
      className={`inline-flex items-center gap-3 ${className}`}
      role="img"
      {...props}
    >
      <ArqonEmblem decorative size={emblemSize} variant={variant} />
      <ArqonWordmark
        className="h-5 w-[7.25rem]"
        decorative
        variant={variant}
      />
    </div>
  );
}
