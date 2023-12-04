import { NextSeo } from "next-seo";
import { getMetadata } from "@/lib/metadata";

type Props = {
  title?: string;
};

export default function PageMetadata({ title }: Props) {
  const md = getMetadata(title);

  return (
    <NextSeo
      title={md.title}
      description={md.description}
      openGraph={md.openGraph}
      twitter={md.twitter}
    />
  );
}
