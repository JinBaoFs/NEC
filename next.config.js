/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NEXT_PUBLIC_ENV_KEY === 'production';

const withNextJsObfuscator = require('nextjs-obfuscator')(
  {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    disableConsoleOutput: false,
    domainLock: isProd
      ? ['beyondcurrencycoin.io', 'https://bccdapp.beyondcurrencycoin.io']
      : ['boundarycoin.com', 'https://dapp.boundarycoin.com'],
    domainLockRedirectUrl: 'about:blank',
    identifierNamesCache: null,
    identifierNamesGenerator: 'mangled',
    optionsPreset: 'low-obfuscation',
    rotateStringArray: true,
    seed: 0,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    ignoreImports: true,
    splitStringsChunkLength: 10,
    debugProtection: isProd,
    stringArray: true,
    stringArrayIndexesType: ['hexadecimal-number'],
    // target: 'browser',
    sourceMap: true
  },
  {
    log: false,
    // writeConfig: true,
    obfuscateFiles: {
      buildManifest: true,
      ssgManifest: true,
      webpack: true,
      additionalModules: ['es6-object-assign']
    }
  }
);

const nextConfig = withNextIntl({
  reactStrictMode: false,
  images: {
    domains: []
  },
  webpack(config, { isServer }) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );
    if (!isServer) {
      config.plugins.push(new CompressionPlugin());
    }

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  compiler: {
    // removeConsole: isProd
    //   ? {
    //       exclude: ['error']
    //     }
    //   : false
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, must-revalidate'
          }
        ]
      },
      {
        source: '/:all*(svg|jpg|png|webp|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, must-revalidate'
          }
        ]
      }
    ];
  }
});

module.exports = isProd ? withNextJsObfuscator(nextConfig) : nextConfig;
