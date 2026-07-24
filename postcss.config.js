module.exports = {
  plugins: {
    tailwindcss: {},
    // stats: {} short-circuits browserslist's getStat, which otherwise walks
    // up the directory tree looking for browserslist-stats.json. Hugo 0.164+
    // runs PostCSS under Node's permission model scoped to the project root,
    // so that search escapes the allowed path and the build panics with
    // ERR_ACCESS_DENIED on "POSTCSS: failed to transform /css/style.css".
    // The "defaults" query in .browserslistrc does not consult custom usage
    // stats, so an empty object changes nothing about the generated CSS.
    autoprefixer: { stats: {} },
  },
};
