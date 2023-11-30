import { ReactNode } from "react";

export type PropsWithChildren<T = ReactNode> = {
  children?: T;
};
