# Empiria Website

The Empiria website is a Hugo-based static site showcasing our team, projects, talks, and blog posts. The site is deployed across multiple platforms for maximum availability and resilience.

## Live Sites

**Primary Deployment - Swarm Network (Canonical):**

- https://empiria.eth.limo
- https://empiria.eth.link
- https://empiria.bzz.link

**Secondary Deployment - GitHub Pages (Fallback):**

- https://empiria.co.uk
- Repository: https://github.com/empiria/empiria.github.io

## Development Setup

### Prerequisites

Install the following tools:

- [Hugo Extended v0.124+](https://gohugo.io/installation/)
- [Node.js v20+](https://nodejs.org/en/download/)
- [Go v1.22+](https://go.dev/doc/install/)

### Getting the Code

**From GitHub:**

```bash
git clone git@github.com:empiria/empiria.github.io.git
cd empiria.github.io
```

**From Radicle (Decentralized):**

```bash
rad clone git@github.com:empiria/empiria.github.io.git
cd empiria.github.io
```

### Installing Dependencies

```bash
npm install
```

## Development Commands

### Local Development

```bash
npm run dev              # Start development server with draft support
npm run preview          # Preview production build locally with live reload
```

### Building and Formatting

```bash
npm run build            # Build production site (output to public/)
npm run format           # Format all files with Prettier
```

### Hugo Modules

```bash
npm run update-modules   # Clean and update all Hugo modules
```

## Deployment Architecture

The site uses a multi-platform deployment strategy:

### Swarm Network (Primary)

- **Target:** IPFS-based distributed storage
- **Access:** Multiple Swarm gateways provide redundancy
- **Benefits:** Permanent, decentralized access with no single point of failure
- **Status:** Canonical deployment target

### GitHub Pages (Secondary)

- **Target:** Traditional web hosting
- **Domain:** https://empiria.co.uk
- **Purpose:** Backup access and conventional web traffic
- **Workflow:** Automatic deployment via `.github/workflows/gh-pages.yml`

### Build Configuration

Critical Hugo settings for multi-domain compatibility:

- `baseURL = "/"` - Essential for deployment across different domains
- `relativeURLs = true` - Ensures links work across all gateways

**Build Process:**

```bash
npm run build    # Single build serves all platforms simultaneously
```

Output directory: `public/` - contains the complete static site ready for deployment.

## Repository Access

- **GitHub:** https://github.com/empiria/empiria.github.io
- **Radicle DID:** `z6MkpNz1akJaoWC26SByZx9BSP5USNQpTsJeeh2ioYmdkBu5`

## Common Tasks

### Adding a New Blog Post

1. Create a markdown file in `content/english/blog/`
2. Add front matter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   date: 2024-01-02
   image: "featured-image.jpg"
   author: "author-name"
   draft: false
   ---
   ```
3. Write content in markdown
4. Set `draft: false` when ready to publish

### Modifying Site Navigation

Edit `config/_default/menus.en.toml` to add, remove, or reorder menu items.

### Changing Site Colors or Fonts

Edit `data/theme.json` - changes automatically propagate to the Tailwind CSS configuration.

### Adding Team Members

1. Create a markdown file in `content/english/team/`
2. Add member details in front matter
3. Add member image to `assets/images/`

### Customizing Theme Templates

Override theme templates by creating corresponding files in the root `layouts/` directory. For example:

- `layouts/blog/single.html` overrides `themes/hugoplate/layouts/blog/single.html`

## Architecture Overview

The site uses:

- **Hugo:** Static site generator with extended features
- **HugoPlate Theme:** Base theme providing layout structure
- **Tailwind CSS:** Utility-first CSS framework
- **Hugo Modules:** Extensible plugin system

For detailed technical architecture and AI-specific guidance, see [AGENTS.md](AGENTS.md).
