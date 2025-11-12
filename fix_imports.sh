#!/bin/bash

# Fix all imports from 'colors' to 'Colors' in src directory
cd "/Users/papayo/Desktop/Carmen San Diego/WisdomQuest"

echo "🔧 Fixing imports..."

# Fix colors imports
find src -type f -name "*.tsx" -o -name "*.ts" | while read file; do
  # Replace import { colors } with import { Colors }
  sed -i '' 's/import { colors }/import { Colors }/g' "$file"

  # Replace from './constants/colors' with proper import
  sed -i '' "s/from '..\/..\/constants\/colors'/from '..\/..\/constants'/g" "$file"
  sed -i '' "s/from '..\/constants\/colors'/from '..\/constants'/g" "$file"
  sed -i '' "s/from '@\/constants\/colors'/from '@\/constants'/g" "$file"

  # Replace colors. usage with Colors.
  sed -i '' 's/colors\./Colors./g' "$file"
done

echo "✅ Imports fixed!"
echo "Files updated:"
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "Colors" {} \; | wc -l
