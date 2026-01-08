# ModelHealth Documentation

This repository contains the documentation website for the ModelHealth SDK, built with [Docusaurus](https://docusaurus.io/).

## Local Development

```bash
npm install
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory.

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
npm run serve  # Preview the build locally
```

Then commit and push the changes to trigger the GitHub Actions workflow.

## Project Structure

```
model-health-docs/
├── docs/                    # Documentation markdown files
│   ├── intro.md
│   ├── getting-started/
│   └── guides/
├── src/
│   ├── css/                # Custom CSS
│   └── pages/              # Custom pages (home, API references)
├── static/                 # Static assets
│   └── img/
├── docusaurus.config.js    # Docusaurus configuration
├── sidebars.js            # Sidebar navigation
└── package.json
```

## Updating Documentation

### Adding New Pages

1. Create a new markdown file in `docs/` or a subdirectory
2. Add frontmatter with `sidebar_position` if needed
3. Update `sidebars.js` if creating a new section

### Integrating API Documentation

The Swift and TypeScript API documentation is generated from the main SDK repository:

- **Swift**: Generated with Swift DocC
- **TypeScript**: Generated with TypeDoc

To update the API reference:

1. Build the documentation in the main repository
2. Copy the generated HTML to appropriate locations
3. Update the placeholder pages in `src/pages/`

## Custom Domain Setup

To use a custom domain like `docs.modelhealth.com`:

1. Add a `CNAME` file to `static/` with your domain
2. Configure DNS with a CNAME record pointing to `model-health.github.io`
3. Enable custom domain in GitHub Pages settings

## License

Same as the main ModelHealth SDK repository.
