# Model Health SDK Documentation

This repository contains the SDK documentation website for Model Health, built with [Docusaurus](https://docusaurus.io/). Hosted at [sdk.modelhealth.io](https://sdk.modelhealth.io).

## Local Development

### Prerequisites

- Node.js 20+

### Setup
```bash
make install
```

### Running the docs site
```bash
make local
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without restarting the server.

## Deployment

Documentation is automatically deployed to GitHub Pages at `https://sdk.modelhealth.io` when the `main` branch is tagged with a new version.

**Tagging should never be done manually. We have scripts to build, push and tag everything that is needed.**

## Project Structure
```
model-health-sdk-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/                        # SDK documentation markdown files
│   ├── intro.md
│   ├── getting-started/
│   └── guides/
├── src/
│   ├── css/                    # Custom CSS
│   └── pages/                  # Custom pages (home, API references)
├── static/                     # Static assets
│   ├── img/
│   ├── swift/                  # Generated Swift docs
│   ├── typescript/             # Generated TypeScript docs
│   └── python/                 # Generated Python docs
├── docusaurus.config.js        # Docusaurus configuration
├── sidebars.js                 # Sidebar navigation
└── package.json
```

## Updating Documentation

1. Anything in `docs/`, `src/` and `static/img` can be modified and committed in this repo.
1. Anything in `static/<language>/` is auto-generated from the SDK source. Changes to these files will be overwritten by future releases.

## Custom Domain

The custom domain `sdk.modelhealth.io` is configured via:
- `static/CNAME` file
- AWS Route 53: `sdk.modelhealth.io` → CNAME → `model-health.github.io`
- GitHub Pages custom domain settings
