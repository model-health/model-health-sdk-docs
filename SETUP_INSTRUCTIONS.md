# Model Health Documentation Setup Guide

This guide will walk you through setting up Docusaurus documentation with GitHub Pages for your Model Health SDK.

## Overview

You now have a complete Docusaurus site ready to deploy. Here's what has been created:

- **Docusaurus website** with home page, getting started guides, and API reference placeholders
- **GitHub Actions workflow** for automatic deployment
- **Custom domain support** for `docs.modelhealth.com`

## Step-by-Step Setup

### 1. Create a New Repository (Option A: Separate Docs Repo)

If you want a separate repository for documentation:

```bash
# Create a new repository on GitHub named 'model-health-docs'
# Then on your local machine:

cd /path/to/model-health-docs  # The directory created for you
git init
git add .
git commit -m "Initial Docusaurus setup"
git branch -M main
git remote add origin https://github.com/model-health/model-health-docs.git
git push -u origin main
```

### 2. Add to Existing Repository (Option B: Same Repo)

If you want documentation in the same repository as your SDK:

```bash
# Copy the docs directory to your main repository
cp -r /path/to/model-health-docs /path/to/model-health/docs-site

cd /path/to/model-health
git add docs-site/
git commit -m "Add Docusaurus documentation site"
git push
```

Then update the GitHub Actions workflow to only trigger on changes to `docs-site/`:

```yaml
on:
  push:
    branches:
      - main
    paths:
      - 'docs-site/**'
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will use the workflow file we created

### 4. Configure Custom Domain

#### In Webflow (or DNS Provider)

Add a CNAME record:
```
Type: CNAME
Name: docs
Value: model-health.github.io
TTL: 3600
```

#### In GitHub Repository

1. Go to **Settings → Pages**
2. Under "Custom domain", enter: `docs.modelhealth.com`
3. Check "Enforce HTTPS"

The `static/CNAME` file is already configured with your domain.

### 5. First Deployment

After pushing to GitHub, the workflow will automatically:
1. Install dependencies
2. Build the Docusaurus site
3. Deploy to GitHub Pages

You can monitor progress in the **Actions** tab on GitHub.

### 6. Verify Deployment

Once the workflow completes:
- Visit `https://model-health.github.io/model-health/` (or your custom domain)
- You should see the Model Health documentation site

DNS propagation for the custom domain can take up to 48 hours, but is usually much faster.

## Local Development

To work on the documentation locally:

```bash
cd model-health-docs
npm install
npm start
```

This opens `http://localhost:3000` with live reload.

## Integrating API Documentation

Currently, the Swift and TypeScript API reference pages are placeholders. Here's how to integrate the real documentation:

### Option 1: Manual Copy

1. Build your API docs:
   ```bash
   cd model-health
   make docs-swift-export    # Creates sdk-docs/swift/
   make docs-typescript-build # Creates sdk-docs/typescript/
   ```

2. Copy to Docusaurus:
   ```bash
   cp -r sdk-docs/swift/ model-health-docs/static/swift/
   cp -r sdk-docs/typescript/ model-health-docs/static/typescript/
   ```

3. Update the placeholder pages (`src/pages/swift.js` and `src/pages/typescript.js`) to redirect or iframe the content.

### Option 2: Automated Build

Add a step to your GitHub Actions workflow to build and include the API docs:

```yaml
- name: Build Swift Documentation
  run: |
    cd ../model-health  # Checkout both repos
    make docs-swift-export
    cp -r sdk-docs/swift ../model-health-docs/static/

- name: Build TypeScript Documentation
  run: |
    cd ../model-health
    make docs-typescript-build
    cp -r sdk-docs/typescript ../model-health-docs/static/
```

### Option 3: Separate Repositories

Keep API docs separate and link to them from the main documentation site. This is simpler but requires users to navigate between sites.

## Updating Documentation

### Adding New Pages

1. Create markdown files in `docs/`:
   ```bash
   cd model-health-docs/docs
   mkdir -p advanced
   cat > advanced/custom-storage.md << 'EOF'
   ---
   sidebar_position: 1
   ---

   # Custom Token Storage

   Learn how to implement custom token storage...
   EOF
   ```

2. Update `sidebars.js` to include the new page

3. Commit and push:
   ```bash
   git add .
   git commit -m "Add custom storage guide"
   git push
   ```

### Modifying Existing Content

Just edit the markdown files in `docs/` and push. The site will automatically rebuild and deploy.

## Customization

### Branding

- **Logo**: Replace `static/img/logo.svg`
- **Favicon**: Replace `static/img/favicon.ico`
- **Colors**: Edit `src/css/custom.css`
- **Site title**: Edit `docusaurus.config.js`

### Navigation

Edit `docusaurus.config.js` to modify the navbar:

```javascript
navbar: {
  items: [
    {
      label: 'Your New Link',
      to: '/your-page',
      position: 'left',
    },
  ],
},
```

### Footer

Edit the `footer` section in `docusaurus.config.js`

## Troubleshooting

### Build Fails

Check the Actions tab for error messages. Common issues:
- Missing dependencies: Run `npm ci` locally first
- Broken links: Check for typos in internal links
- Invalid frontmatter: Ensure all markdown files have valid YAML

### Custom Domain Not Working

1. Verify CNAME record with: `dig docs.modelhealth.com CNAME`
2. Ensure `static/CNAME` file exists with correct domain
3. Check GitHub Pages settings show your custom domain
4. Wait for DNS propagation (can take up to 48 hours)

### Site Not Updating

1. Check Actions tab - is the workflow running?
2. Clear browser cache
3. Try incognito/private browsing mode

## Advanced Configuration

### Search

Add Algolia DocSearch for free documentation search:

1. Apply at: https://docsearch.algolia.com/
2. Once approved, add to `docusaurus.config.js`:

```javascript
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'modelhealth',
  },
},
```

### Analytics

Add Google Analytics:

```javascript
themeConfig: {
  gtag: {
    trackingID: 'G-XXXXXXXXXX',
  },
},
```

### Versioning

For multiple SDK versions:

```bash
npm run docusaurus docs:version 1.0
```

This creates versioned documentation that users can switch between.

## Next Steps

1. **Test locally**: `npm start` and review the site
2. **Push to GitHub**: Follow deployment steps above
3. **Add real content**: Replace placeholders with actual documentation
4. **Integrate API docs**: Follow integration guide above
5. **Customize branding**: Update logo, colors, etc.
6. **Set up custom domain**: Configure DNS and GitHub Pages

## Support

For Docusaurus-specific questions, see:
- https://docusaurus.io/docs
- https://github.com/facebook/docusaurus/discussions

For GitHub Pages issues:
- https://docs.github.com/en/pages

## Files Created

Here's what was created for you:

```
model-health-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
├── .gitignore                   # Git ignore file
├── README.md                    # Repository README
├── SETUP_INSTRUCTIONS.md        # This file
├── package.json                 # Node.js dependencies
├── docusaurus.config.js         # Main configuration
├── sidebars.js                  # Sidebar navigation
├── docs/                        # Documentation content
│   ├── intro.md
│   ├── getting-started/
│   │   ├── installation.md
│   │   └── quick-start.md
│   └── guides/
│       ├── authentication.md
│       ├── camera-calibration.md
│       ├── recording-activities.md
│       └── analysis.md
├── src/
│   ├── css/
│   │   └── custom.css          # Custom styles
│   └── pages/
│       ├── index.js            # Home page
│       ├── index.module.css
│       ├── swift.js            # Swift API placeholder
│       └── typescript.js       # TypeScript API placeholder
└── static/
    ├── CNAME                   # Custom domain config
    └── img/                    # Logo and images (add yours)
```

Good luck with your documentation! 🚀
