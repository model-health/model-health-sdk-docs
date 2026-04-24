// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  productSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      customProps: { icon: 'Rocket' },
      items: [
        'Checklist',
        'recording-first',
        'activity-type-library',
        'best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Recording set up guides',
      collapsed: true,
      customProps: { icon: 'Video' },
      items: [
        'recording-small-capture',
        'recording-large-capture',
        'recording-treadmill',
      ],
    },
    {
      type: 'category',
      label: 'How to',
      collapsed: true,
      customProps: { icon: 'Lightbulb' },
      items: [
        'howto-compare-activities',
        'analysis-group-leaderboards',
        'export-data-python',
        'howto-share-activity',
        'howto-batch-record'
      ],
    },
    {
      type: 'category',
      label: 'Advanced Configuration',
      collapsed: true,
      customProps: { icon: 'Settings' },
      items: [
        'advanced-settings',
        'advanced-analysis',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      customProps: { icon: 'BookMarked' },
      items: [
        'musculoskeletal-model',
        'troubleshooting',
      ],
    },
  ],
};

module.exports = sidebars;
