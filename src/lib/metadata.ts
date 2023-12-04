export const sharedMetadata = {
  applicationName: "Power Search",
  title: "Power Search",
  description:
    "Power Search allows you to search the information you need the way you want, by curating customer search shortcuts.",
  authors: [{ name: "Nick Guernsey", url: "https://www.github.com/nguernse" }],
  keywords: ["search", "search engine"],
};

type Metadata = {
  title: string;
  applicationName: string;
  description: string;
  authors: { name: string; url: string }[];
  keywords: string[];
  openGraph: {
    siteName: string;
    title: string;
    description: string;
    type: string;
  };
  twitter: {
    site: string;
    card: string;
    title: string;
    description: string;
  };
};

export const getMetadata = (title?: string): Metadata => {
  const metadata: Metadata = {
    ...sharedMetadata,
    title: title ? `${sharedMetadata.title} | ${title}` : sharedMetadata.title,
    openGraph: {
      siteName: sharedMetadata.applicationName,
      title: title
        ? `${sharedMetadata.title} | ${title}`
        : sharedMetadata.title,
      description: sharedMetadata.description,
      type: "website",
    },
    twitter: {
      site: sharedMetadata.applicationName,
      card: "summary_large_image",
      title: title
        ? `${sharedMetadata.title} | ${title}`
        : sharedMetadata.title,
      description: sharedMetadata.description,
    },
  };

  return metadata;
};
