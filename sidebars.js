/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/authentication',
        'guides/camera-calibration',
        'guides/subject-calibration',
        'guides/activity-recording',
        'guides/activity-analysis',
      ],
    },
    {
      type: 'category',
      label: 'SDK Reference',
      items: [
        {
          type: 'link',
          label: 'Swift SDK',
          href: '/swift-api',
        },
        {
          type: 'link',
          label: 'TypeScript SDK',
          href: '/typescript-api',
        },
      ],
    },
    'examples',
    'changelog',
  ],
};

module.exports = sidebars;
