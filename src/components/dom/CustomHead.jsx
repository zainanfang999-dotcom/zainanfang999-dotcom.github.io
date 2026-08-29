import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getLanguagePath, isEnglishPath } from '@src/utils/locale';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
const OG_IMAGE = `${SITE_URL}/og.png`;

const getSchema = (language, url) => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  name: language === 'en' ? 'Zhao Qingzhuo' : '赵庆卓',
  jobTitle: language === 'en' ? 'AI Product Manager' : 'AI 产品经理',
  url,
  image: OG_IMAGE,
  email: 'mailto:2074211486@qq.com',
  sameAs: [],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: language === 'en' ? 'Southeast University' : '东南大学',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: language === 'en' ? 'Chongqing University' : '重庆大学',
    },
  ],
});

function CustomHead({ title = '', description, keywords, language }) {
  const router = useRouter();
  const currentPath = router.asPath.split(/[?#]/)[0] || '/';
  const resolvedLanguage = language || (isEnglishPath(currentPath) ? 'en' : 'zh');
  const canonicalUrl = `${SITE_URL}${currentPath === '/' ? '' : currentPath}`;
  const chineseUrl = `${SITE_URL}${getLanguagePath(currentPath, 'zh') === '/' ? '' : getLanguagePath(currentPath, 'zh')}`;
  const englishUrl = `${SITE_URL}${getLanguagePath(currentPath, 'en')}`;

  return (
    <>
      <NextHead>
        {/* General Meta Tags */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow' : 'noindex,nofollow'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="keywords" content={keywords && keywords.length ? keywords.join(',') : keywords} />
        <meta name="author" content={resolvedLanguage === 'en' ? 'Zhao Qingzhuo' : '赵庆卓'} />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="CN" />

        {/* Canonical and Title */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="zh-CN" href={chineseUrl} />
        <link rel="alternate" hrefLang="en" href={englishUrl} />
        <link rel="alternate" hrefLang="x-default" href={chineseUrl} />
        <title>{title}</title>

        {/* OpenGraph Meta Tags */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={resolvedLanguage === 'en' ? 'en_US' : 'zh_CN'} />

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSchema(resolvedLanguage, canonicalUrl)),
          }}
        />
      </NextHead>
      <NextSeo title={title} description={description} canonical={canonicalUrl} />
    </>
  );
}

export default CustomHead;
