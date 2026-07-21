# Violet Void for the Arch Linux ecosystem

A dark Violet Void UserCSS theme with a consistent handcrafted palette for the ArchWiki and the supported Arch Linux sites.

## Features

- Arch Linux ecosystem coverage, including the wiki, forums, AUR, bugs, GitLab, repositories, security, lists, and manual pages
- Accessible focus indicators and reduced-motion support
- Responsive desktop and mobile layouts
- Print styles and syntax highlighting
- A single site-scoped, installable UserCSS artifact

## Install

1. Install the [Stylus browser extension](https://add0n.com/stylus.html).
2. Open the [raw Violet Void UserCSS file](https://raw.githubusercontent.com/aaronedev/violet-void-theme_archwiki/main/dist/violet-void-theme-archwiki.user.css).
3. Confirm the installation in Stylus. Future updates use the same canonical URL.

## Develop

Requirements:

- Node.js 20 or newer
- npm

Clone and install dependencies:

```bash
git clone https://github.com/aaronedev/violet-void-theme_archwiki.git
cd violet-void-theme_archwiki
npm install
```

Build the canonical artifact:

```bash
npm run build
```

The output is `dist/violet-void-theme-archwiki.user.css`. A normal build uses `userStyle.version` from `package.json` as-is and does not change package metadata or Git state.

Watch the Stylus source and rebuild once on startup and after changes:

```bash
npm run watch
```

For a local Stylus live-reload loop, keep the watcher running and serve the repository from another terminal:

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/dist/violet-void-theme-archwiki.user.css` to reach the Stylus installer, then enable its **Live reload** checkbox and keep that installer tab open. Source saves rebuild the same URL, which Stylus reloads while the server, watcher, and installer tab remain open.

Run the build contracts and lint checks:

```bash
npm run test:build
npm run lint
```

## Release

Set a dot-separated numeric UserCSS version and regenerate the canonical artifact explicitly:

```bash
npm run release -- 20260721.09.30
```

The release command validates the version, updates only `package.json#userStyle.version`, and builds the canonical artifact. It does not stage, commit, push, or publish anything; review those two file changes and use the normal repository workflow afterward.

## Source layout

`src/main.styl` is the distribution entrypoint. See [`src/README.md`](src/README.md) for the shipped import graph and the intentionally dormant modules.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for project history.

## License

MIT © [aaronedev](https://github.com/aaronedev)
