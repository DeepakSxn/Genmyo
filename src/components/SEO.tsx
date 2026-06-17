import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

const BASE_URL = "https://www.genmyo.ai";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
}: SEOProps) {
  const fullTitle = `${title} | GenMyo`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${BASE_URL}${canonical}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${BASE_URL}${canonical}`} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
