/** @type {import('next').NextConfig} */
const isStaticExport = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  pageExtensions: ['page.jsx'],
  output: isStaticExport ? 'export' : undefined,
  trailingSlash: isStaticExport,
  experimental: {
    // optimizeCss: true,
    // nextScriptWorkers: true,
  },
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.

  images: {
    unoptimized: isStaticExport,
  },
  webpack(config, { isServer }) {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': path.resolve(__dirname),
    //   '@src/': path.resolve(__dirname, 'src'),
    //   '@app/': path.resolve(__dirname, 'app'),
    // };
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp');
    }
    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
};

if (!isStaticExport) {
  nextConfig.headers = async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ];
  nextConfig.redirects = async () => [
    { source: '/home', destination: '/', permanent: true },
    { source: '/404', destination: '/', permanent: true },
  ];
}

module.exports = nextConfig;
