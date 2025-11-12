#!/usr/bin/env python3
"""
Generate App Icon and Splash Screen for Hope Quest
Production-quality assets using PIL/Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import math
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call(["/usr/bin/python3", "-m", "pip", "install", "--user", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont
    import math

def create_app_icon(size=1024):
    """Create Hope Quest app icon with globe and family silhouettes"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background gradient (sky blue to light blue)
    for y in range(size):
        ratio = y / size
        r = int(74 + (135 - 74) * ratio)
        g = int(144 + (206 - 144) * ratio)
        b = int(226 + (250 - 226) * ratio)
        draw.rectangle([(0, y), (size, y+1)], fill=(r, g, b, 255))

    # Create circular mask for icon
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([(0, 0), (size, size)], fill=255)

    # Draw globe (center circle)
    center_x, center_y = size // 2, size // 2
    globe_radius = int(size * 0.35)

    # Globe background (green for land, blue for water)
    draw.ellipse([
        (center_x - globe_radius, center_y - globe_radius),
        (center_x + globe_radius, center_y + globe_radius)
    ], fill=(52, 168, 83, 255))  # Green

    # Draw continents (simplified shapes)
    # Americas
    draw.ellipse([
        (center_x - globe_radius + 50, center_y - 100),
        (center_x - globe_radius + 150, center_y + 100)
    ], fill=(34, 139, 34, 255))

    # Europe/Africa
    draw.ellipse([
        (center_x - 50, center_y - globe_radius + 80),
        (center_x + 100, center_y + globe_radius - 50)
    ], fill=(46, 125, 50, 255))

    # Asia
    draw.ellipse([
        (center_x + 50, center_y - 120),
        (center_x + globe_radius - 40, center_y + 80)
    ], fill=(27, 94, 32, 255))

    # Add latitude/longitude lines
    for i in range(-2, 3):
        y_offset = i * globe_radius // 3
        x_reduction = min(abs(y_offset * 2), globe_radius - 10)
        x1 = center_x - globe_radius + x_reduction
        x2 = center_x + globe_radius - x_reduction
        if x2 > x1:  # Only draw if valid coordinates
            draw.ellipse([
                (x1, center_y + y_offset - 5),
                (x2, center_y + y_offset + 5)
            ], outline=(255, 255, 255, 100), width=2)

    # Draw family silhouettes at bottom
    family_y = int(size * 0.75)
    family_size = int(size * 0.08)

    # Dad (tall)
    draw.ellipse([
        (center_x - family_size * 3, family_y - family_size),
        (center_x - family_size * 2.5, family_y - family_size * 0.5)
    ], fill=(255, 193, 7, 255))  # Head
    draw.rectangle([
        (center_x - family_size * 3, family_y - family_size * 0.5),
        (center_x - family_size * 2.5, family_y + family_size)
    ], fill=(255, 193, 7, 255))  # Body

    # Mom (tall)
    draw.ellipse([
        (center_x - family_size * 2, family_y - family_size),
        (center_x - family_size * 1.5, family_y - family_size * 0.5)
    ], fill=(243, 156, 18, 255))  # Head
    draw.polygon([
        (center_x - family_size * 2.2, family_y - family_size * 0.5),
        (center_x - family_size * 1.3, family_y - family_size * 0.5),
        (center_x - family_size * 1, family_y + family_size),
        (center_x - family_size * 2.5, family_y + family_size)
    ], fill=(243, 156, 18, 255))  # Dress

    # Boy (medium)
    draw.ellipse([
        (center_x - family_size * 0.5, family_y - family_size * 0.7),
        (center_x, family_y - family_size * 0.3)
    ], fill=(255, 235, 59, 255))  # Head
    draw.rectangle([
        (center_x - family_size * 0.5, family_y - family_size * 0.3),
        (center_x, family_y + family_size * 0.7)
    ], fill=(255, 235, 59, 255))  # Body

    # Girl (medium)
    draw.ellipse([
        (center_x + family_size * 0.5, family_y - family_size * 0.7),
        (center_x + family_size, family_y - family_size * 0.3)
    ], fill=(255, 241, 118, 255))  # Head
    draw.polygon([
        (center_x + family_size * 0.3, family_y - family_size * 0.3),
        (center_x + family_size * 1.2, family_y - family_size * 0.3),
        (center_x + family_size * 1.3, family_y + family_size * 0.7),
        (center_x + family_size * 0.2, family_y + family_size * 0.7)
    ], fill=(255, 241, 118, 255))  # Dress

    # Dog (small)
    draw.ellipse([
        (center_x + family_size * 1.8, family_y + family_size * 0.2),
        (center_x + family_size * 2.3, family_y + family_size * 0.5)
    ], fill=(139, 69, 19, 255))  # Head
    draw.ellipse([
        (center_x + family_size * 1.7, family_y + family_size * 0.5),
        (center_x + family_size * 2.4, family_y + family_size * 0.9)
    ], fill=(160, 82, 45, 255))  # Body

    # Add sun rays around globe
    num_rays = 16
    for i in range(num_rays):
        angle = (2 * math.pi * i) / num_rays
        start_x = center_x + int((globe_radius + 20) * math.cos(angle))
        start_y = center_y + int((globe_radius + 20) * math.sin(angle))
        end_x = center_x + int((globe_radius + 60) * math.cos(angle))
        end_y = center_y + int((globe_radius + 60) * math.sin(angle))
        draw.line([(start_x, start_y), (end_x, end_y)], fill=(255, 235, 59, 200), width=6)

    # Apply circular mask
    img.putalpha(mask)

    return img

def create_splash_screen(size=2048):
    """Create Hope Quest splash screen"""
    img = Image.new('RGB', (size, size), (74, 144, 226))
    draw = ImageDraw.Draw(img)

    # Gradient background (sky blue to golden horizon)
    for y in range(size):
        ratio = y / size
        if ratio < 0.7:
            # Sky gradient
            r = int(74 + (135 - 74) * ratio)
            g = int(144 + (206 - 144) * ratio)
            b = int(226 + (250 - 226) * ratio)
        else:
            # Horizon to golden
            horizon_ratio = (ratio - 0.7) / 0.3
            r = int(135 + (243 - 135) * horizon_ratio)
            g = int(206 + (156 - 206) * horizon_ratio)
            b = int(250 + (18 - 250) * horizon_ratio)
        draw.rectangle([(0, y), (size, y+1)], fill=(r, g, b))

    # Draw larger icon in center (70% of screen)
    icon_size = int(size * 0.5)
    icon = create_app_icon(icon_size)

    # Position icon in upper-center
    icon_x = (size - icon_size) // 2
    icon_y = int(size * 0.2)
    img.paste(icon, (icon_x, icon_y), icon)

    # Add text "Hope Quest" below icon
    text_y = icon_y + icon_size + int(size * 0.05)

    try:
        # Try to use a nice font
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.08))
        font_subtitle = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.035))
        font_version = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.02))
    except:
        # Fallback to default
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_version = ImageFont.load_default()

    # Title
    title = "Hope Quest"
    title_bbox = draw.textbbox((0, 0), title, font=font_title)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text(
        ((size - title_width) // 2, text_y),
        title,
        fill=(255, 255, 255),
        font=font_title
    )

    # Subtitle
    subtitle = "A Journey of Hope and Discovery"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_subtitle)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    draw.text(
        ((size - subtitle_width) // 2, text_y + int(size * 0.12)),
        subtitle,
        fill=(255, 255, 255, 230),
        font=font_subtitle
    )

    # Version at bottom
    version = "v1.0.0"
    version_bbox = draw.textbbox((0, 0), version, font=font_version)
    version_width = version_bbox[2] - version_bbox[0]
    draw.text(
        ((size - version_width) // 2, size - int(size * 0.05)),
        version,
        fill=(255, 255, 255, 180),
        font=font_version
    )

    return img

if __name__ == "__main__":
    print("🎨 Generating Hope Quest app icon and splash screen...")

    # Generate icon
    print("📱 Creating app icon (1024x1024)...")
    icon = create_app_icon(1024)
    icon.save("assets/icon.png", "PNG", optimize=True)
    print("✅ Icon saved to assets/icon.png")

    # Generate splash
    print("🌅 Creating splash screen (2048x2048)...")
    splash = create_splash_screen(2048)
    splash.save("assets/splash.png", "PNG", optimize=True)
    print("✅ Splash saved to assets/splash.png")

    print("\n🎉 Done! Assets are production-ready.")
