#!/bin/bash
# Visual scout capture script - uses playwright CLI directly
BASE=".agent/archwiki/current"
CSS="dist/main.css"

pages=("Main_page:https://wiki.archlinux.org/title/Main_page" "Systemd:https://wiki.archlinux.org/title/Systemd" "Pacman:https://wiki.archlinux.org/title/Pacman" "Installation_guide:https://wiki.archlinux.org/title/Installation_guide" "Firefox:https://wiki.archlinux.org/title/Firefox")
viewports=("1280x800:desktop" "375x667:mobile")
states=("default" "menu-open" "toc-open" "search-active")

for pv in "${viewports[@]}"; do
  vp="${pv%%:*}"
  vname="${pv##*:}"

  for page in "${pages[@]}"; do
    pname="${page%%:*}"
    purl="${page##*:}"

    for state in "${states[@]}"; do
      fname="${pname}.${vname}.${state}.png"
      fpath="${BASE}/${fname}"
      echo "Capturing ${fname}..."

      # Use playwright CLI - inject CSS via --add-style-tag once playwright supports it
      # For now capture raw then note CSS injection status
      npx playwright screenshot --browser=chromium --viewport="${vp}" "${purl}" "${fpath}" 2>&1 | tail -1
    done
  done
done
echo "Done."