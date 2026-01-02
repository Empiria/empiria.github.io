# AGENTS.md

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

This is the Empiria website, a Hugo-based static site using the HugoPlate theme with Tailwind CSS for styling. The site is built with Hugo Extended (v0.124+), Node.js (v20+), and Go (v1.22+).

## Development Commands

### Local Development

```bash
npm run dev              # Start Hugo development server with draft support
npm run preview          # Preview production build locally with live reload
```

### Building

```bash
npm run build            # Build production site (output to public/)
npm run format           # Format all files with Prettier
```

### Hugo Modules

```bash
npm run update-modules   # Clean and update all Hugo modules
```

## Architecture

### Hugo Configuration Structure

- **Root `hugo.toml`**: Main Hugo configuration including theme selection, build settings, and plugin definitions
- **`config/_default/`**: Modular configuration directory
  - `params.toml`: Site parameters (logo, colors, features, footer text, etc.)
  - `menus.en.toml`: Navigation menu structure
  - `languages.toml`: Internationalization settings
  - `module.toml`: Hugo module imports and dependencies

### Content Organization

All content lives under `content/english/`:

- `blog/`: Blog posts (markdown files with frontmatter)
- `projects/`: Project showcase pages
- `talks/`: Conference talks and presentations
- `team/`: Team member profiles
- `about/`: About page content
- `contact/`: Contact page
- `pages/`: General static pages
- `sections/`: Reusable content sections
- `_index.md`: Homepage content

Content is structured using Hugo's content organization with front matter for metadata.

### Theme System

The site uses the HugoPlate theme located in `themes/hugoplate/`. The theme provides:

- Layout templates in `themes/hugoplate/layouts/`
- Component partials and shortcodes
- Base styling and structure

**Do not modify theme files directly**. Override theme templates by creating corresponding files in the root `layouts/` directory.

### Styling and Design

- **Tailwind CSS**: Primary styling framework configured via `tailwind.config.js`
- **Theme Configuration**: `data/theme.json` defines:
  - Color schemes (light and dark mode)
  - Typography settings (font families: Heebo and Signika)
  - Font sizing scale
- **Custom Styles**: Additional SCSS in `assets/scss/`
- **Tailwind Config**: Reads from `data/theme.json` and generates dynamic Tailwind configuration
- **Build Process**: `hugo_stats.json` tracks used classes for PurgeCSS optimization

### Hugo Modules

The site uses Hugo modules from `gethugothemes/hugo-modules` for features like:

- Image optimization and favicon handling
- Search functionality
- Gallery sliders and accordions
- PWA support
- Social sharing
- Font Awesome icons

Modules are defined in `config/_default/module.toml` and managed via `go.mod`.

### Assets and Static Files

- **`assets/`**: Source files processed by Hugo Pipes (images, SCSS)
- **`static/` (via theme)**: Static files served directly
- **`data/`**: Data files (theme.json for design tokens, social.json for social links)
- **`resources/`**: Hugo-generated cached resources

## Key Concepts

### Content Front Matter

Blog posts and pages use YAML front matter with fields like:

- `title`: Page title
- `date`: Publication date
- `image`: Featured image
- `author`: Author name (links to team member)
- `categories` / `tags`: Taxonomies
- `draft`: Draft status

### Multilingual Support

The site is configured for internationalization with English as the default language (`defaultContentLanguage = 'en'`). Content is organized by language subdirectories.

### Dark Mode

Dark mode is configured via:

- `params.toml`: `theme_switcher = true`, `theme_default = "dark"`
- `data/theme.json`: Separate color palettes for light/dark modes
- Tailwind CSS darkmode classes

### Build Optimization

- Hugo builds track used CSS classes via `hugo_stats.json`
- Tailwind uses this for PurgeCSS to minimize bundle size
- Cache busters configured in `hugo.toml` for assets
- Image processing and caching configured under `[imaging]` and `[caches]`

## Common Workflows

### Adding a New Blog Post

1. Create a markdown file in `content/english/blog/`
2. Add front matter with required fields (title, date, image, author, etc.)
3. Write content in markdown
4. Set `draft: false` when ready to publish

### Modifying Site Navigation

Edit `config/_default/menus.en.toml` to add/remove/reorder menu items.

### Changing Site Colors or Fonts

Edit `data/theme.json` - changes automatically propagate to Tailwind config.

### Customizing Theme Templates

Create a file in root `layouts/` mirroring the theme path (e.g., `layouts/blog/single.html` overrides `themes/hugoplate/layouts/blog/single.html`).

### Updating Dependencies

- **Hugo modules**: `npm run update-modules`
- **npm packages**: `npm update` (for Tailwind, PostCSS, etc.)

## Deployment

### Multi-Platform Architecture

The Empiria website is designed to work across multiple platforms with a single Hugo build:

**Primary Deployment - Swarm Network:**

- Canonical deployment target: Swarm network (IPFS-based distributed storage)
- Accessible via multiple Swarm gateways:
  - https://empiria.eth.limo
  - https://empiria.eth.link
  - https://empiria.bzz.link
- Content addressed via IPFS for permanent, decentralized access
- No single point of failure

**Secondary Deployment - GitHub Pages:**

- Repository: https://github.com/empiria/empiria.github.io
- Custom domain: https://empiria.co.uk
- Serves traditional web traffic and provides backup access
- Build workflow: `.github/workflows/gh-pages.yml`

### Hugo Configuration for Multi-Domain Support

**Critical Configuration:**

- `baseURL = "/"` - Essential for multi-domain compatibility
- `relativeURLs = true` - Ensures links work across all gateways
- **Why this matters**: Absolute URLs would break when accessed via different Swarm gateways

**Build Process:**

- Command: `npm run build`
- Output: `public/` directory
- Single build serves all platforms simultaneously

### Repository Naming

- **Local directory**: `empiria-website` (development convenience)
- **GitHub repository**: `empiria.github.io` (organization site for Pages)
- **No rename required**: Local and remote names can differ
