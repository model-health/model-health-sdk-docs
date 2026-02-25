// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { sdkVersion } = require('./version.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Model Health SDK',
  tagline: 'Biomechanical analysis from smartphone videos',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.modelhealth.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'model-health', // Usually your GitHub org/user name.
  projectName: 'model-health', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Custom fields to expose environment variables to client-side
  customFields: {
    DOCUSAURUS_API_URL: process.env.DOCUSAURUS_API_URL,
    BUILD_ENV: process.env.BUILD_ENV,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Model Health',
        logo: {
          alt: 'Model Health Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/swift-api',
            label: 'Swift SDK',
            position: 'left',
          },
          {
            to: '/typescript-api',
            label: 'TypeScript SDK',
            position: 'left',
          },
          {
            to: '/python-api',
            label: 'Python SDK',
            position: 'left',
          },
          // {
          //   to: '/register',
          //   label: 'Get API Key',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `SDK v${sdkVersion} · Copyright © ${new Date().getFullYear()} Model Health.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['swift', 'typescript', 'bash', 'python'],
      },
    }),
};

module.exports = config;
