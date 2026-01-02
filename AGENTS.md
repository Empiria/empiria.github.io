# AGENTS.md

This file provides guidance to AI assistants when working with code in this repository.

**For basic development setup and deployment information, see [README.md](README.md).**

## Technical Architecture

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

## Key Technical Details

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

## Radicle Integration

### Repository Details

- **DID**: `z6MkpNz1akJaoWC26SByZx9BSP5USNQpTsJeeh2ioYmdkBu5`
- **Radicle is used for decentralized development collaboration**

### Radicle Commands

**Always use these exact commands for Radicle issue management:**

```bash
# Create issues
rad issue open --title "Title" --description "Description" --label "priority:high"

# Comment on issues
rad issue comment <issue-id> --message "Comment text" --no-announce

# Close issues (NOT "rad issue close")
rad issue state <issue-id> --closed --no-announce

# Assign issues
rad issue assign --add $(rad self --did) --no-announce <issue-id>
rad issue assign --delete $(rad self --did) --no-announce <issue-id>

# Label management
rad issue label --add "status:in-progress" --no-announce <issue-id>
rad issue label --delete "status:in-progress" --no-announce <issue-id>
```

**Key Points:**

- Use `rad issue state <issue-id> --closed` (NOT `rad issue close`)
- Always include `--no-announce` flag for local-only operations
- Use `$(rad self --did)` for self-assignment

## AI Assistant Guidelines

### Code Comments

Use comments sparingly. Only add comments when:

- The intention of the code is not immediately clear from reading it
- An obvious-looking alternative approach is not actually suitable (explain why)

**Prefer these alternatives to comments:**

1. **Proper variable naming**: Use descriptive names that explain purpose
2. **Refactor into named functions**: Extract complex logic into well-named functions
3. **Docstrings**: Document public APIs, function parameters, return values, and exceptions

### File Operations

When working with files:

1. **Read first**: Always read a file before editing to understand current structure
2. **Follow conventions**: Mimic existing code style, patterns, and naming conventions
3. **Check imports**: Examine surrounding context to understand framework and library usage
4. **Override properly**: Use root `layouts/` directory to override theme templates, don't modify theme files directly

### Hugo-Specific Considerations

- **Configuration**: Changes to `hugo.toml` or files in `config/_default/` affect the entire site
- **Content structure**: Follow Hugo's content organization patterns for proper taxonomy and menu generation
- **Front matter**: Ensure proper YAML formatting and required fields for different content types
- **Module management**: Use `npm run update-modules` to update Hugo modules safely

## References

- [Hugo Documentation](https://gohugo.io/documentation/)
- [HugoPlate Theme](https://github.com/zeon-studio/hugoplate/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radicle Documentation](https://radicle.xyz/)
