import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <div className="arqon-page-transition">{children}</div>;
}
