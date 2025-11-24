# violet-void-theme

A dark Violet-Void theme for ArchWiki that applies a consistent, handcrafted color palette.

![Screenshot Placeholder](https://via.placeholder.com/800x400?text=Violet+Void+Theme+Preview)

## Description

This theme replaces the default ArchWiki appearance with a dark, violet-themed interface designed for readability and aesthetics. It includes:
- A consistent color palette.
- Customized syntax highlighting for code blocks.
- Modernized UI elements (buttons, inputs, tables).
- Responsive design adjustments.

## Installation

### Using Stylus Extension

1.  Install the **Stylus** browser extension ([Chrome](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/styl-us/)).
2.  Click on the extension icon and select "Manage".
3.  Create a new style.
4.  Copy the contents of `dist/main.css` (or build it yourself) into the editor.
5.  Set the domain to `wiki.archlinux.org`.
6.  Save and enjoy!

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/aaronedev/violet-void-theme.git
    cd violet-void-theme
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Build

To compile the Stylus files into CSS:

```bash
npm run build
```

The output file will be located at `dist/main.css`.

### Watch

To automatically recompile changes during development:

```bash
npm run watch
```

### Lint & Format

Check for style issues:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## License

MIT © [aaronedev](https://github.com/aaronedev)
