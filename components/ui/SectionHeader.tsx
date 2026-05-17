import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rightSlot?: ReactNode;
  align?: "row" | "stack";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  rightSlot,
  align = "row",
  className = "",
}: SectionHeaderProps) {
  if (align === "stack") {
    return (
      <div className={`mb-6 ${className}`}>
        {eyebrow && (
          <p className="text-sm text-white/40 uppercase tracking-widest">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">
            {description}
          </p>
        )}
        {rightSlot && <div className="mt-4">{rightSlot}</div>}
      </div>
    );
  }

  // align === "row" (default)
  return (
    <div className={`mb-6 flex items-start justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-sm text-white/40 uppercase tracking-widest">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">
            {description}
          </p>
        )}
      </div>
      {rightSlot && (
        <div className="shrink-0 self-center">{rightSlot}</div>
      )}
    </div>
  );
}

/*
 * Ne değişti?
 * Yeni dosya: Sayfa içi bölüm başlığı atomu.
 * "row" ve "stack" align modları, eyebrow/title/description/rightSlot desteği.
 * Proje tasarım diliyle uyumlu renk skalası (text-white/40, text-white/50).
 */
