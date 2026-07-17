import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  jsonSchema?: Record<string, any> | Record<string, any>[];
}

export const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "https://genmyo.ai/og-image.jpg",
  twitterCard = "summary_large_image",
  jsonSchema,
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = "https://genmyo.ai";
  
  // Use the passed canonical route, or fall back to the current route path
  const routePath = canonical || location.pathname;
  const canonicalUrl = `${siteUrl}${routePath.startsWith("/") ? "" : "/"}${routePath}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | GenMyo` : "GenMyo"}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card metadata */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {jsonSchema && (
        <script type="application/ld+json">
          {JSON.stringify(jsonSchema)}
        </script>
      )}
    </Helmet>
  );
};
