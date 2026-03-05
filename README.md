# Model Health Documentation

This repository contains the documentation website for the Model Health SDK, built with [Docusaurus](https://docusaurus.io/).

## Local Development

### Prerequisites

- Node.js 20+

### Setup
```bash
# Install Docusaurus dependencies
make install
```

### Running the docs site
```bash
make local
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without restarting the server.

## Deployment

Documentation is automatically deployed to GitHub Pages at `https://docs.modelhealth.io` when the `main` branch is tagged with a new version.

**Tagging should never be done manually. We have scripts to build, push and tag everything that is needed.**

## Project Structure
```
model-health-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/                        # Documentation markdown files
│   ├── intro.md
│   ├── examples.md
│   ├── getting-started/
│   └── guides/
├── src/
│   ├── css/                    # Custom CSS
│   └── pages/                  # Custom pages (home, API references)
├── static/                     # Static assets
│   ├── img/
│   ├── swift/                  # Generated Swift docs
│   ├── .../                    # Other language docs
│   └── typescript/             # Generated TypeScript docs
├── docusaurus.config.js        # Docusaurus configuration
├── sidebars.js                 # Sidebar navigation
└── package.json
```

## Updating Documentation

1. Anything in `docs/`, `src/` and `static/img` can be modified and committed in this repo.
1. Anything in `static/<language>/` is auto-generated from the SDK source. Changes to these files will be overwritten by future releases.

### Adding New Pages

1. Create a new markdown file in `docs/` or a subdirectory
1. Update `sidebars.js` if creating a new section

### Modifying Guides

Edit markdown files in `docs/getting-started/` or `docs/guides/`. Changes are automatically deployed when pushed to `main`.

### Dark mode

The documentation supports light and dark mode. When adding content it's important to avoid using any hard coded colours. Refer to the CSS files for the correct styling.

## Custom Domain

The custom domain `docs.modelhealth.io` is configured via:
- `static/CNAME` file
- AWS Config - Route 53 DNS: `docs.modelhealth.io` → CNAME → `model-health.github.io`
- GitHub Pages custom domain settings
