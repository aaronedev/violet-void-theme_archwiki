#!/bin/bash
BASELINES="baselines"
CURRENT="current"
DIFFS="diffs"
METRIC_FILE="diff-metrics.txt"

echo "Comparing current screenshots against baselines..."
echo ""

total=0
changed=0
identical=0

> "$METRIC_FILE"

for baseline in "$BASELINES"/*.png; do
  basename=$(basename "$baseline")
  current_file="$CURRENT/$basename"
  diff_file="$DIFFS/$basename"
  
  if [[ -f "$current_file" ]]; then
    total=$((total + 1))
    
    # Use ImageMagick compare with AE (Absolute Error) metric
    # AE = number of pixels that are different
    result=$(compare -metric AE "$baseline" "$current_file" "$diff_file" 2>&1)
    ae_value=$(echo "$result" | grep -oE '^[0-9]+' | head -1)
    
    if [[ -z "$ae_value" ]]; then
      ae_value="?"
    fi
    
    echo "$basename: AE=$ae_value" >> "$METRIC_FILE"
    
    if [[ "$ae_value" == "0" ]]; then
      identical=$((identical + 1))
      echo "  ✓ $basename — IDENTICAL (AE=0)"
      rm -f "$diff_file"
    else
      changed=$((changed + 1))
      echo "  ✗ $basename — CHANGED (AE=$ae_value)"
    fi
  fi
done

echo ""
echo "Summary: $total total, $changed changed, $identical identical"
