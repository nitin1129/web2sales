import React from 'react';
import { Helmet } from 'react-helmet';

export const SITE_URL = 'https://web2sales.in';
export const SITE_NAME = 'Web2Sales';
export const SITE_LEGAL_NAME = 'GMDS Technologies OPC Private Limited';
export const DEFAULT_TITLE =
  'Web2Sales — Best Website Developer & Maintenance Agency in India';
export const DEFAULT_DESCRIPTION =
  'Web2Sales by GMDS Technologies builds and maintains high-converting business websites in India. Best website developer, SEO-ready websites, lead-generating web design, and full website management — sub-second load times and measurable ROI.';
export const DEFAULT_KEYWORDS =
  'best website developer india, best web development company india, website creator india, website maintenance india, website management services, lead generation website, conversion-focused web design, SEO-ready website, fast business website, custom website development, web2sales, gmds technologies';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const absolute = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return `${SITE_URL}/${url}`;
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path = '',
  canonical,
  image,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd
}) => {
  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  const canonicalUrl = absolute(canonical || `${SITE_URL}${path || '/'}`);
  const ogImage = absolute(image || DEFAULT_OG_IMAGE);

  const jsonLdBlocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'
        }
      />
      <meta name="author" content={author || SITE_LEGAL_NAME} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
