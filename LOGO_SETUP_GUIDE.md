# 🦁 Lilita Keper Logo Setup Guide

## Overview
This guide explains how to prepare and integrate the Lilita Keper professional logo into the website.

## Current Status
✅ Logo component created: `LililaLogo.tsx`  
⏳ Waiting for: High-resolution logo files with transparent background

## Logo Requirements

### File Format & Resolution
The logo should be optimized in these formats and sizes:

| File | Size | Format | Usage |
|------|------|--------|-------|
| `lilita-keper-logo-transparent.png` | 512×512px | PNG (Transparent) | NavBar, General Use |
| `lilita-keper-logo-sm.png` | 128×128px | PNG (Transparent) | Favicon, Small Displays |
| `lilita-keper-logo-md.png` | 256×256px | PNG (Transparent) | Medium Displays |
| `lilita-keper-logo-lg.png` | 512×512px | PNG (Transparent) | Large Displays, Print |
| `lilita-keper-logo.svg` | Scalable | SVG | Best for Web (optional) |

### Color Specifications
- **Primary Colors**: Gold/Brown badge border with brown/maroon text
- **Background**: Transparent PNG (no white background)
- **Text**: "LILITA KEPER" with "MASAI MARA" subtitle
- **Badge**: Oval/elliptical shape with wildlife silhouette

## File Placement

All logo files should be placed in:
```
/apps/web/public/logos/
```

Current directory structure:
```
apps/web/public/logos/
├── lilita-keper-logo-transparent.png   (512x512, primary)
├── lilita-keper-logo-sm.png            (128x128)
├── lilita-keper-logo-md.png            (256x256)
├── lilita-keper-logo-lg.png            (512x512)
└── lilita-keper-logo.svg               (optional)
```

## How to Prepare the Logo

### Option 1: Using Online Tools (Recommended)
1. **Remove Background**:
   - Use: https://remove.bg/ (free online tool)
   - Upload your Lilita Keper logo
   - Download as PNG with transparent background

2. **Resize for Web**:
   - Use: https://imageresizer.com/
   - Create 512×512px version (main)
   - Create 256×256px, 128×128px variants
   - Export as PNG

3. **Optimize**:
   - Use: https://tinypng.com/
   - Compress PNG files (saves ~50% file size)

### Option 2: Using ImageMagick (Command Line)
```bash
# Remove white background and make transparent
convert lilita-logo.png -transparent white lilita-keper-logo-transparent.png

# Create smaller versions
convert lilita-keper-logo-transparent.png -resize 256x256 lilita-keper-logo-md.png
convert lilita-keper-logo-transparent.png -resize 128x128 lilita-keper-logo-sm.png

# Optimize PNG compression
pngquant 256 lilita-keper-logo-transparent.png --ext .png --force
```

### Option 3: Using Python PIL/Pillow
```python
from PIL import Image

# Open image
img = Image.open('lilita-logo.png')

# Remove white background
img = img.convert('RGBA')
data = img.getdata()

new_data = []
for item in data:
    if item[:3] == (255, 255, 255):  # White background
        new_data.append((255, 255, 255, 0))  # Make transparent
    else:
        new_data.append(item)

img.putdata(new_data)

# Save versions
img.save('lilita-keper-logo-transparent.png')
img.resize((256, 256)).save('lilita-keper-logo-md.png')
img.resize((128, 128)).save('lilita-keper-logo-sm.png')
```

## Integration Points

### 1. NavBar (Primary)
- Location: `/apps/web/src/components/layout/NavBar.tsx`
- Component: `<LililaLogo size="sm" />`
- Displays: Logo in header on all pages
- Current Size: 40×40px

### 2. Favicon
- Location: `/apps/web/public/favicon.ico`
- Update with: `lilita-keper-logo-sm.png`
- Size: 32×32px or 64×64px

### 3. Homepage Hero
- Add to: `/apps/web/src/app/page.tsx`
- Size: `lg` variant (56×56px)
- Optional: Use larger version for featured section

### 4. Social Media
- Use: `lilita-keper-logo-lg.png` (512×512px)
- LinkedIn: 400×400px minimum
- Twitter: 200×200px minimum
- Instagram: 1080×1080px recommended

### 5. Email Campaigns
- Use: `lilita-keper-logo-md.png` (256×256px)
- Embed as inline image in Resend emails

## Using the Logo Component

### Basic Usage
```tsx
import { LililaLogo } from "@/components/layout/LililaLogo";

// Small logo (navbar)
<LililaLogo size="sm" />

// Medium logo with text
<LililaLogo size="md" showText={true} />

// Large logo without text
<LililaLogo size="lg" showText={false} />
```

### Props
- `size`: `"sm"` (40×40) | `"md"` (48×48) | `"lg"` (56×56)
- `showText`: Show "LILITA KEPER" text (default: `true`)

## Checklist

- [ ] Download original Lilita Keper logo
- [ ] Remove white background (make transparent PNG)
- [ ] Create 512×512px version
- [ ] Create 256×256px version
- [ ] Create 128×128px version
- [ ] Optimize PNGs with TinyPNG
- [ ] Place all files in `/apps/web/public/logos/`
- [ ] Name main file: `lilita-keper-logo-transparent.png`
- [ ] Test logo displays in NavBar
- [ ] Create favicon from logo
- [ ] Update social media assets

## Testing

After adding logo files, test:

1. **NavBar**: Logo displays on all pages
2. **Responsiveness**: Logo scales on mobile/tablet
3. **Transparency**: Background is transparent (no white box)
4. **Loading**: Image loads quickly (optimized file size)

## Next Steps

1. **Prepare Logo Files** (if not done):
   - Download the three PNG versions with transparent backgrounds
   - Place in `/apps/web/public/logos/`

2. **Create Favicon**:
   ```bash
   # Convert logo to favicon
   convert lilita-keper-logo-sm.png favicon.ico
   ```

3. **Add to Manifest** (PWA support):
   - Update `/apps/web/public/manifest.json`
   - Add logo icon references

4. **Test in Browser**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Check NavBar logo displays correctly
   ```

## File Size Targets

For optimal performance:
- `lilita-keper-logo-transparent.png`: < 30KB
- `lilita-keper-logo-md.png`: < 15KB
- `lilita-keper-logo-sm.png`: < 8KB

Use TinyPNG compression if sizes exceed these targets.

## Support

For questions about logo optimization:
- PNG optimization: https://tinypng.com/
- Background removal: https://remove.bg/
- Image resizing: https://imageresizer.com/

---

**Status**: Ready for logo file integration  
**Last Updated**: August 31, 2026  
**Component**: `/apps/web/src/components/layout/LililaLogo.tsx`
