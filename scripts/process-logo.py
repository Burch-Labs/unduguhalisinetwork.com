#!/usr/bin/env python3
"""
Process Lilita Keper Logo
Removes white background and creates multiple resolutions
"""

from PIL import Image
import os
import sys

def remove_white_background(image_path):
    """Remove white background from image and make transparent"""
    img = Image.open(image_path).convert('RGBA')

    # Get image data
    data = img.getdata()

    # Process each pixel
    new_data = []
    for item in data:
        # If pixel is white (255, 255, 255) or very close, make transparent
        if item[:3] == (255, 255, 255) or all(c >= 240 for c in item[:3]):
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    return img

def create_logo_variants(input_path, output_dir="apps/web/public/logos"):
    """Create all logo variants from source image"""

    if not os.path.exists(input_path):
        print(f"❌ Error: File not found: {input_path}")
        return False

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"✅ Created directory: {output_dir}")

    print(f"\n🔄 Processing logo: {input_path}")

    try:
        # Remove white background
        print("📍 Removing white background...")
        img = remove_white_background(input_path)

        # Create variants
        variants = [
            ("lilita-keper-logo-transparent.png", (512, 512), "Primary - Full resolution"),
            ("lilita-keper-logo-lg.png", (512, 512), "Large - 512×512px"),
            ("lilita-keper-logo-md.png", (256, 256), "Medium - 256×256px"),
            ("lilita-keper-logo-sm.png", (128, 128), "Small - 128×128px"),
        ]

        for filename, size, description in variants:
            output_path = os.path.join(output_dir, filename)

            # Resize if needed
            if size != img.size:
                resized = img.resize(size, Image.Resampling.LANCZOS)
            else:
                resized = img

            # Save
            resized.save(output_path, 'PNG', optimize=True)
            file_size = os.path.getsize(output_path) / 1024  # KB
            print(f"  ✅ {description}: {filename} ({file_size:.1f}KB)")

        print(f"\n✨ All variants created successfully in: {output_dir}")
        print("\n📋 Files created:")
        for filename, _, _ in variants:
            path = os.path.join(output_dir, filename)
            if os.path.exists(path):
                size = os.path.getsize(path) / 1024
                print(f"  • {filename} ({size:.1f}KB)")

        return True

    except Exception as e:
        print(f"❌ Error processing logo: {str(e)}")
        return False

def optimize_png(file_path):
    """Optimize PNG file size"""
    try:
        img = Image.open(file_path)
        img.save(file_path, 'PNG', optimize=True)
        size = os.path.getsize(file_path) / 1024
        print(f"✅ Optimized: {file_path} ({size:.1f}KB)")
        return True
    except Exception as e:
        print(f"❌ Error optimizing: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("""
🦁 Lilita Keper Logo Processor
================================

Usage: python scripts/process-logo.py <input-image> [output-dir]

Example:
  python scripts/process-logo.py lilita-logo.png
  python scripts/process-logo.py lilita-logo.png apps/web/public/logos

Features:
  • Removes white background (makes transparent)
  • Creates multiple resolutions (512, 256, 128px)
  • Optimizes file sizes
  • Saves as PNG with transparency

Requirements:
  pip install Pillow
        """)
        sys.exit(1)

    input_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "apps/web/public/logos"

    success = create_logo_variants(input_file, output_dir)
    sys.exit(0 if success else 1)
