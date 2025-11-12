#!/bin/bash

# Hope Quest - Asset Generation Script
# Genera todos los assets necesarios para producción

set -e

echo "🎨 Hope Quest - Asset Generation"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

echo -e "${GREEN}✅ ImageMagick found${NC}"

# Create directories
echo ""
echo "📁 Creating asset directories..."
mkdir -p assets/images/characters
mkdir -p assets/images/icons
mkdir -p assets/animations
mkdir -p assets/audio/music
mkdir -p assets/audio/sfx

# Generate App Icon
echo ""
echo "🎯 Generating App Icon (1024x1024)..."
convert -size 1024x1024 \
  -define gradient:angle=135 \
  gradient:"#4A90E2"-"#63B3ED" \
  \( -size 800x800 xc:none \
     -draw "fill white circle 400,400 400,50" \
     -draw "fill #4A90E2 translate 200,250 path 'M 0,0 L 50,0 L 25,50 Z'" \
     -draw "fill #4A90E2 translate 300,250 path 'M 0,0 L 50,0 L 25,50 Z'" \
     -draw "fill #4A90E2 translate 400,250 path 'M 0,0 L 50,0 L 25,50 Z'" \
     -draw "fill #F39C12 circle 150,150 150,120" \
  \) \
  -gravity center -composite \
  -font Helvetica-Bold -pointsize 80 -fill white \
  -gravity south -annotate +0+100 "HOPE QUEST" \
  assets/icon.png

echo -e "${GREEN}✅ Icon created: assets/icon.png${NC}"

# Generate Splash Screen
echo ""
echo "🌅 Generating Splash Screen (2048x2048)..."
convert -size 2048x2048 \
  -define gradient:angle=135 \
  gradient:"#4A90E2"-"#F39C12" \
  \( assets/icon.png -resize 600x600 \) \
  -gravity center -geometry +0-200 -composite \
  -font Helvetica-Bold -pointsize 120 -fill white \
  -gravity center -annotate +0+400 "Hope Quest" \
  -pointsize 60 -fill "#E8F4F8" \
  -gravity center -annotate +0+500 "A Journey of Hope and Discovery" \
  assets/splash.png

echo -e "${GREEN}✅ Splash created: assets/splash.png${NC}"

# Generate Character Placeholders (SVG-style with ImageMagick)
echo ""
echo "👥 Generating Character Art..."

# Function to create character
create_character() {
    local name=$1
    local color=$2
    local expression=$3

    convert -size 512x512 xc:none \
      -fill "$color" -draw "circle 256,200 256,100" \
      -fill white -draw "circle 220,180 220,165" \
      -fill white -draw "circle 292,180 292,165" \
      -fill black -draw "circle 220,180 220,172" \
      -fill black -draw "circle 292,180 292,172" \
      -fill "#FF6B6B" -draw "path 'M 200,280 Q 256,320 312,280'" \
      -font Helvetica -pointsize 24 -fill black \
      -gravity south -annotate +0+20 "$expression" \
      "assets/images/characters/${name}_${expression}.png"
}

# Pepe (Boy - Blue)
for expr in neutral happy sad excited determined; do
    create_character "pepe" "#4A90E2" "$expr"
done

# Paula (Girl - Pink)
for expr in neutral happy sad excited determined; do
    create_character "paula" "#E91E63" "$expr"
done

# Isabella (Adopted Girl - Purple)
for expr in neutral happy sad excited hopeful; do
    create_character "isabella" "#9C27B0" "$expr"
done

# Xolo (Axolotl - Green/Pink)
for expr in neutral wise playful; do
    create_character "xolo" "#4CAF50" "$expr"
done

# Don Bowser (Antagonist - Red/Orange)
for expr in angry smug; do
    create_character "don_bowser" "#FF5722" "$expr"
done

# Koopa Hielo (Guards - Ice Blue)
for expr in guard chase; do
    create_character "koopa_hielo" "#00BCD4" "$expr"
done

echo -e "${GREEN}✅ 22 character images created${NC}"

# Generate minimal Lottie animations (JSON)
echo ""
echo "✨ Generating Lottie Animation Templates..."

cat > assets/animations/loading_spinner.json << 'EOF'
{
  "v": "5.5.7",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 200,
  "h": 200,
  "nm": "Loading Spinner",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "r": {
          "a": 1,
          "k": [
            {"t": 0, "s": [0]},
            {"t": 60, "s": [360]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "el",
          "p": {"a": 0, "k": [100, 100]},
          "s": {"a": 0, "k": [80, 80]}
        },
        {
          "ty": "st",
          "c": {"a": 0, "k": [0.29, 0.56, 0.89, 1]},
          "w": {"a": 0, "k": 10}
        }
      ],
      "ip": 0,
      "op": 60,
      "st": 0
    }
  ]
}
EOF

# Create simple animation templates for all required animations
animations=(
    "portal_aereo:Airplane"
    "portal_maritimo:Ship"
    "portal_terrestre:Bus"
    "portal_clandestino:Door"
    "portal_refugiado:Tent"
    "portal_familiar:Family"
    "collect_star:Star"
    "collect_coin:Coin"
    "celebration_country_complete:Confetti"
    "celebration_level_up:LevelUp"
    "celebration_achievement:Trophy"
    "success_checkmark:Check"
    "error_x:XMark"
    "character_walk:Walk"
    "character_jump:Jump"
)

for anim in "${animations[@]}"; do
    IFS=: read -r filename name <<< "$anim"
    cp assets/animations/loading_spinner.json "assets/animations/${filename}.json"
    # Update name in JSON
    sed -i.bak "s/Loading Spinner/$name/g" "assets/animations/${filename}.json"
    rm "assets/animations/${filename}.json.bak" 2>/dev/null || true
done

echo -e "${GREEN}✅ 16 Lottie animation templates created${NC}"

# Generate silent audio files
echo ""
echo "🔊 Generating Audio Files..."

# Check if ffmpeg is installed
if command -v ffmpeg &> /dev/null; then
    echo "Using ffmpeg to generate silent audio..."

    # Music (3 minutes of silence)
    for track in menu map portal activity victory defeat; do
        ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 180 \
          -acodec libmp3lame -b:a 128k \
          "assets/audio/music/${track}.mp3" -y -loglevel quiet
    done

    # SFX (0.5 seconds of silence)
    sfx=(
        "button_press" "button_hover" "portal_select" "portal_enter"
        "level_complete" "achievement_unlock" "coin_collect" "star_earn"
        "error" "success" "companion_meet" "checkpoint_pass" "checkpoint_fail"
    )

    for effect in "${sfx[@]}"; do
        ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 0.5 \
          -acodec libmp3lame -b:a 64k \
          "assets/audio/sfx/${effect}.mp3" -y -loglevel quiet
    done

    echo -e "${GREEN}✅ 19 audio files created (silent placeholders)${NC}"
else
    echo -e "${YELLOW}⚠️  ffmpeg not found. Skipping audio generation.${NC}"
    echo "Install with: brew install ffmpeg"
    echo "Or download from: https://ffmpeg.org/download.html"
fi

# Summary
echo ""
echo "================================"
echo -e "${GREEN}✅ Asset Generation Complete!${NC}"
echo ""
echo "Generated:"
echo "  📱 App Icon (1024x1024)"
echo "  🌅 Splash Screen (2048x2048)"
echo "  👥 22 Character Images (512x512)"
echo "  ✨ 16 Lottie Animations (JSON)"
if command -v ffmpeg &> /dev/null; then
    echo "  🔊 19 Audio Files (MP3)"
fi
echo ""
echo "Next steps:"
echo "  1. Review assets in ./assets/"
echo "  2. Replace with professional designs (optional)"
echo "  3. Run: npm start"
echo ""
