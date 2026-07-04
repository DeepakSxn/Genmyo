import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
}: SEOProps) => {
  const siteUrl = "https://www.genmyo.ai";
  const canonicalUrl = canonical ? `${siteUrl}${canonical.startsWith("/") ? "" : "/"}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | GenMyo` : "GenMyo"}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card metadata */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};
