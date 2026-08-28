import NextHead from 'next/head';
import { NextSeo } from 'next-seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
const OG_IMAGE = `${SITE_URL}/og.png`;

const getSchema = () => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  name: '赵庆卓',
  jobTitle: 'AI 产品经理',
  url: SITE_URL,
  image: OG_IMAGE,
  email: 'mailto:zai_nanfang@163.com',
  sameAs: [],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: '东南大学' },
    { '@type': 'CollegeOrUniversity', name: '重庆大学' },
  ],
});

function CustomHead({ title = '', description, keywords }) {
  return (
    <>
      <NextHead>
        {/* General Meta Tags */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow' : 'noindex,nofollow'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="keywords" content={keywords && keywords.length ? keywords.join(',') : keywords} />
        <meta name="author" content="赵庆卓" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="CN" />

        {/* Canonical and Title */}
        <link rel="canonical" href={SITE_URL} />
        <title>{title}</title>

        {/* OpenGraph Meta Tags */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Favicons */}
        <link rel="icon" href={`${SITE_URL}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${SITE_URL}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${SITE_URL}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${SITE_URL}/favicon-16x16.png`} />
        <link rel="manifest" href={`${SITE_URL}/site.webmanifest`} />
        <link rel="mask-icon" href={`${SITE_URL}/safari-pinned-tab.svg`} color="#333333" />
        <meta name="msapplication-TileColor" content="#f4f4f1" />
        <meta name="theme-color" content="#f4f4f1" />

        {/* Schema */}
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }} />
      </NextHead>
      <NextSeo title={title} description={description} />
    </>
  );
}

export default CustomHead;
