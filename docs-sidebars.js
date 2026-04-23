// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  productSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'Checklist',
        'recording-first',
        'web-app-tips',
        'best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Setting Up Sessions',
      collapsed: true,
      items: [
        'activity-recommendations',
      ],
    },
    {
      type: 'category',
      label: 'Recording Guides',
      collapsed: true,
      items: [
        'recording-small-capture',
        'recording-large-capture',
        'recording-group',
      ],
    },
    {
      type: 'category',
      label: 'Analysis Guides',
      collapsed: true,
      items: [
        'analysis-progress-tracking',
        'analysis-subject-comparisons',
        'analysis-group-leaderboards',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Configuration',
      collapsed: true,
      items: [
        'advanced-settings',
        'advanced-analysis',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'musculoskeletal-model',
        'troubleshooting',
      ],
    },
  ],
};

module.exports = sidebars;
