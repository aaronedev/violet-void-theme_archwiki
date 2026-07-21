# Stylus source reachability

`main.styl` is the only distribution entrypoint. Its imports, including their transitive imports, are compiled inside the single Arch Linux `@-moz-document` scope. Variable and mixin modules may be imported repeatedly because they emit no selectors; `utilities/viewport-height.styl` is imported directly once because it emits utility classes.

The current entrypoint reaches the component, performance, theme, utility, mixin, and variable modules needed by the shipped theme. The following modules exist in the repository but are currently dormant (not reachable from `main.styl`):

- `components/accessibility.styl`
- `components/admin.styl`
- `components/advisory.styl`
- `components/diff.styl`
- `components/discussion.styl`
- `components/gadgets.styl`
- `components/glass.styl`
- `components/history.styl`
- `components/infobox.styl`
- `components/interwiki.styl`
- `components/preferences.styl`
- `components/pwa.styl`
- `components/scrollbars.styl`
- `components/states.styl`
- `components/templates.styl`
- `components/translation.styl`
- `critical.styl`
- `performance/lazy.styl`
- `performance/viewport.styl`
- `variables/_fonts.styl`

Dormant modules are retained as source material. Add one to `main.styl` only when its behavior is intentionally made part of the distributed theme and covered by the relevant tests; do not import modules merely to make them reachable.
