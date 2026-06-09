#!/bin/bash
cd /data/.openclaw/workspace/projects/rideon-es-code

# Reemplazar patrones de import .asset.json por URL directa
# Los .asset.json tenían formato {url: "/lovable-assets/..."}

# Helper function: replace asset import with inline URL const
fix_asset() {
  local file="$1"
  local import_name="$2"
  local asset_path="$3"
  local url="$4"

  # Replace the import line
  sed -i "s|^import ${import_name} from \"@/assets/${asset_path}\"|const ${import_name} = { url: \"${url}\" }|" "$file"
}

# Footer - rideon logo
fix_asset "src/components/Footer.tsx" "rideonLogo" "rideon-logo.png.asset.json" "/assets/rideon-logo.svg"

# Header - rideon logo
fix_asset "src/components/Header.tsx" "rideonLogo" "rideon-logo.png.asset.json" "/assets/rideon-logo.svg"

# Partners
fix_asset "src/components/Partners.tsx" "yvolt" "yvolt-logo-v2.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/components/Partners.tsx" "bike79" "79bike-logo-v2.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/components/Partners.tsx" "fastace" "fastace-logo.png.asset.json" "/assets/placeholder.svg"
# rideon in Partners is imported twice, need different treatment
sed -i "s|^import rideon from \"@/assets/rideon-distribution-logo.png.asset.json\"|const __rideon_partner = { url: \"/assets/rideon-logo.svg\" }|" "src/components/Partners.tsx"
sed -i 's|const rideon|const __rideon_renamed|' "src/components/Partners.tsx"
# Actually let me check the Partners file structure
echo "=== Partners.tsx ==="
head -15 src/components/Partners.tsx

# SEO
fix_asset "src/lib/seo.ts" "ogImageAsset" "og-image.jpg.asset.json" "/assets/placeholder.svg"

# a-propos
fix_asset "src/routes/\$lang/a-propos.tsx" "teamPhoto" "about-team-79bike.jpeg.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/a-propos.tsx" "portraitPhoto" "about-portrait.jpg.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/a-propos.tsx" "chinaBg" "about-china-bg.jpg.asset.json" "/assets/placeholder.svg"

# barcelone
fix_asset "src/routes/\$lang/barcelone.tsx" "barcelonaHero" "barcelona-hero.jpg.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/barcelone.tsx" "barcelonaBg" "barcelona-bg.jpg.asset.json" "/assets/placeholder.svg"

# index
fix_asset "src/routes/\$lang/index.tsx" "heroVideo" "logo79bikey-volt.mp4.asset.json" "/assets/placeholder.svg"

# leucate
fix_asset "src/routes/\$lang/leucate.tsx" "leucateMap" "rando-leucate-map.png.asset.json" "/assets/placeholder.svg"

# location
fix_asset "src/routes/\$lang/location.tsx" "leCuingMap" "rando-le-cuing-map.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/location.tsx" "barceloneMap" "rando-barcelone-map.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/location.tsx" "baqueiraMap" "rando-baqueira-map.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/location.tsx" "circuitPrive" "circuit-prive.jpeg.asset.json" "/assets/placeholder.svg"
# leucateMap is imported twice in location (duplicate name)
sed -i "s|^import leucateMap from \"@/assets/rando-leucate-map.png.asset.json\"|// leucateMap already imported above|" "src/routes/\$lang/location.tsx"
fix_asset "src/routes/\$lang/location.tsx" "randonneesBanner" "randonnees-banner.jpg.asset.json" "/assets/placeholder.svg"

# mecanique
fix_asset "src/routes/\$lang/mecanique.tsx" "heroVideo" "atelier-hero.mov.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/mecanique.tsx" "atelierHands" "atelier-hands-v3.jpg.asset.json" "/assets/placeholder.svg"

# motos
fix_asset "src/routes/\$lang/motos.tsx" "motosVideo" "video-y-volt-motos.mp4.asset.json" "/assets/placeholder.svg"

# pieces
fix_asset "src/routes/\$lang/pieces.tsx" "piecesBanner" "piece-banner.jpg.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/pieces.tsx" "piecesVideo" "piece-banner.mp4.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/pieces.tsx" "yvoltLogo" "yvolt-logo-v2.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/pieces.tsx" "bike79Logo" "79bike-logo-v2.png.asset.json" "/assets/placeholder.svg"
fix_asset "src/routes/\$lang/pieces.tsx" "fastaceLogo" "fastace-logo.png.asset.json" "/assets/placeholder.svg"

# __root
fix_asset "src/routes/__root.tsx" "rideonLogo" "rideon-logo.png.asset.json" "/assets/rideon-logo.svg"

echo "=== Done fixing assets ==="
