import { cn } from "@/lib/utils";
import { PropsWithChildren, PropsWithClassname } from "@/types";
import NextLink, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = LinkProps &
  PropsWithChildren &
  PropsWithClassname &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ children, className, ...props }: Props) {
  return (
    <NextLink
      className={cn("text-blue-500 hover:text-blue-600 underline", className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
