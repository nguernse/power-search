import { PropsWithChildren } from "@/types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className={`bg-slate-50 ${inter.className}`}>{children}</div>;
}
