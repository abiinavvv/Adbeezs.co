# 📁 Where to Add Assets (Images, Fonts, etc.)

## Image Assets

### Location: `public/` folder

All static assets like images, icons, and files go in the **`public/`** folder at the root of your project.

```
adbeesz_web/
  └── public/
      ├── images/          ← Create this folder for your images
      │   ├── bus-ad.jpg
      │   ├── kiosk.jpg
      │   ├── airplane-seat.jpg
      │   └── logo.png
      └── ...
```

### How to Use Images in Your Code:

```tsx
import Image from 'next/image';

// For images in public folder
<Image 
  src="/images/bus-ad.jpg"  // Path starts with / (root of public folder)
  alt="Bus advertising"
  width={800}
  height={600}
/>
```

### Current Image Placeholders:

The homepage has 3 image placeholders that you can replace:
1. **Bus Advertising** - Line ~224 in `app/page.tsx`
2. **Digital Kiosk** - Line ~224 in `app/page.tsx`
3. **Airplane Seat** - Line ~224 in `app/page.tsx`

### Recommended Image Sizes:
- **Hero images**: 1920x1080px or larger
- **Showcase images**: 1200x800px
- **Logo**: 500x500px (SVG preferred)
- **Icons**: 64x64px or 128x128px

## Custom Fonts

### Option 1: Google Fonts (Already Set Up)
Fonts are loaded in `app/layout.tsx`. Currently using:
- **Bebas Neue** - For the big ADBEEZS title
- **Oswald** - Alternative bold font
- **Playfair Display** - For elegant serif text
- **Geist** - For body text

### Option 2: Custom Font Files
If you have custom font files (.woff, .woff2, .ttf):

1. Create `public/fonts/` folder
2. Add your font files there
3. Add to `app/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

## SVG Icons

SVG files can go in `public/` or `public/icons/`

```tsx
// Use SVG as image
<Image src="/icons/icon.svg" alt="icon" width={24} height={24} />

// Or import as component (create in app/components/)
```

## Video Files

Videos go in `public/videos/`

```tsx
<video src="/videos/promo.mp4" autoPlay muted loop />
```

## File Structure Example:

```
public/
  ├── images/
  │   ├── hero/
  │   ├── showcase/
  │   └── clients/
  ├── icons/
  ├── fonts/
  ├── videos/
  └── favicon.ico
```

## Tips:
- ✅ Use Next.js `Image` component for optimized images
- ✅ Use descriptive folder names (images/, icons/, etc.)
- ✅ Optimize images before adding (compress, resize)
- ✅ Use WebP format when possible for better performance
- ✅ Keep file names lowercase with hyphens (e.g., `bus-advertising.jpg`)

