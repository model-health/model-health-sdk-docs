# Model Health Documentation

This repository contains the documentation website for the Model Health SDK, built with [Docusaurus](https://docusaurus.io/).

## Local Development

### Prerequisites

- Node.js 20+
- Conda (for building API documentation locally)

### Setup
```bash
# Install Docusaurus dependencies
npm install

# Set up conda environment for API docs (one-time)
conda create -n docs ruby=3.1
conda activate docs
gem install jazzy --no-document
```

### Running the docs site
```bash
npm start
```

This starts a local development server at `http://localhost:3000`. Most changes are reflected live without restarting the server.

### Building API Documentation Locally

The SDK is included as a git submodule. To build the API docs:
```bash
# Activate conda environment
conda activate docs

# Build Swift and TypeScript API docs
cd sdk
make docs-swift-build
make docs-typescript-build
cd ..

# Copy to Docusaurus static folder
mkdir -p static/swift static/typescript
cp -r sdk/sdk-docs/swift/* static/swift/
cp -r sdk/sdk-docs/typescript/* static/typescript/

# Now run Docusaurus
npm start
```

Visit `http://localhost:3000/swift` and `http://localhost:3000/typescript` to view the API docs.

## Build
```bash
npm run build
```

This generates static content into the `build` directory.

## Deployment

Documentation is automatically deployed to GitHub Pages at `https://docs.modelhealth.io` when changes are pushed to the `main` branch.

### How It Works

1. GitHub Actions checks out this repo with the SDK submodule
2. Builds Swift API docs using Jazzy
3. Builds TypeScript API docs using TypeDoc
4. Builds the Docusaurus site
5. Deploys to GitHub Pages

### Updating API Documentation

The SDK is included as a submodule pointing to a specific commit. To update the API docs:
```bash
cd sdk
git checkout main
git pull origin main
cd ..
git add sdk
git commit -m "Update SDK submodule to latest"
git push
```

This triggers a rebuild and deployment with the updated API documentation.

## Project Structure
```
model-health-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/                        # Documentation markdown files
│   ├── intro.md
│   ├── getting-started/
│   └── guides/
├── src/
│   ├── css/                    # Custom CSS
│   └── pages/                  # Custom pages (home, API references)
├── static/                     # Static assets
│   ├── img/
│   ├── swift/                  # Generated Swift docs (gitignored)
│   └── typescript/             # Generated TypeScript docs (gitignored)
├── sdk/                        # Git submodule to model-health repo
├── docusaurus.config.js        # Docusaurus configuration
├── sidebars.js                 # Sidebar navigation
└── package.json
```

## Updating Documentation

### Adding New Pages

1. Create a new markdown file in `docs/` or a subdirectory
2. Add frontmatter with `sidebar_position` if needed
3. Update `sidebars.js` if creating a new section

### Modifying Guides

Edit markdown files in `docs/getting-started/` or `docs/guides/`. Changes are automatically deployed when pushed to `main`.

### API Documentation

API documentation is generated from the SDK submodule:
- **Swift**: Generated with [Jazzy](https://github.com/realm/jazzy) from `ModelHealthService.swift` and `Models.swift`
- **TypeScript**: Generated with [TypeDoc](https://typedoc.org/) from `index.ts`

The submodule points to a specific SDK commit. Update the submodule reference to update API docs.

## Custom Domain

Custom domain `docs.modelhealth.io` is configured via:
- `static/CNAME` file
- Route 53 DNS: `docs.modelhealth.io` → CNAME → `model-health.github.io`
- GitHub Pages custom domain settings

## Troubleshooting

### Submodule not initialized
```bash
git submodule update --init --recursive
```

### Local API docs not showing

Ensure you've built and copied the API docs:
```bash
conda activate docs
cd sdk && make docs-swift-build docs-typescript-build && cd ..
mkdir -p static/swift static/typescript
cp -r sdk/sdk-docs/swift/* static/swift/
cp -r sdk/sdk-docs/typescript/* static/typescript/
```

### GitHub Actions failing

Check the Actions tab for detailed logs. Common issues:
- Submodule access (requires `SUBMODULE_TOKEN` secret)
- Node version mismatch (requires Node 20+)
- Missing Jazzy (should auto-install on macOS runner)

## License

Same as the main Model Health SDK repository.
