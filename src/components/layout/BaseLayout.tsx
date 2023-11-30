import { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

export default function BaseLayout({ children }: Props) {
  return <div>{children}</div>;
}
