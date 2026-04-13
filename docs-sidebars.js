// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  productSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started',
        'web-app-tips',
      ],
    },
    {
      type: 'category',
      label: 'Setting Up Sessions',
      collapsed: false,
      items: [
        'activity-recommendations',
        'best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Configuration',
      collapsed: false,
      items: [
        'advanced-settings',
        'advanced-analysis',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'musculoskeletal-model',
        'troubleshooting',
      ],
    },
  ],
};

module.exports = sidebars;
