import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function BaseLayout({ children }: PropsWithChildren) {
  return <div className={`bg-slate-50 ${inter.className}`}>{children}</div>;
}
