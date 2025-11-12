#!/usr/bin/env python3
"""
Generate all 22 character images for Hope Quest
Production-quality character art using PIL/Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

SIZE = 2048

def draw_character_pepe(draw, expression, size):
    """Draw Pepe (boy) with given expression"""
    center_x, center_y = size // 2, size // 2

    # Skin tone (light brown)
    skin_color = (222, 184, 135)

    # Head (larger circle)
    head_radius = size // 4
    draw.ellipse([
        (center_x - head_radius, center_y - head_radius - 100),
        (center_x + head_radius, center_y + head_radius - 100)
    ], fill=skin_color)

    # Hair (brown, spiky)
    hair_color = (101, 67, 33)
    for i in range(-3, 4):
        x_offset = i * 60
        draw.ellipse([
            (center_x + x_offset - 40, center_y - head_radius - 180),
            (center_x + x_offset + 40, center_y - head_radius - 60)
        ], fill=hair_color)

    # Eyes
    eye_y = center_y - 80
    eye_spacing = 80

    # Left eye
    draw.ellipse([
        (center_x - eye_spacing - 40, eye_y - 30),
        (center_x - eye_spacing + 40, eye_y + 30)
    ], fill=(255, 255, 255))
    draw.ellipse([
        (center_x - eye_spacing - 20, eye_y - 15),
        (center_x - eye_spacing + 20, eye_y + 15)
    ], fill=(50, 30, 20))

    # Right eye
    draw.ellipse([
        (center_x + eye_spacing - 40, eye_y - 30),
        (center_x + eye_spacing + 40, eye_y + 30)
    ], fill=(255, 255, 255))
    draw.ellipse([
        (center_x + eye_spacing - 20, eye_y - 15),
        (center_x + eye_spacing + 20, eye_y + 15)
    ], fill=(50, 30, 20))

    # Mouth based on expression
    mouth_y = center_y + 50
    if expression == "happy":
        # Big smile
        draw.arc([
            (center_x - 100, mouth_y - 50),
            (center_x + 100, mouth_y + 50)
        ], start=0, end=180, fill=(200, 80, 80), width=15)
    elif expression == "sad":
        # Frown
        draw.arc([
            (center_x - 100, mouth_y - 50),
            (center_x + 100, mouth_y + 50)
        ], start=180, end=360, fill=(150, 100, 100), width=15)
    elif expression == "excited":
        # Open mouth smile
        draw.ellipse([
            (center_x - 80, mouth_y - 40),
            (center_x + 80, mouth_y + 40)
        ], fill=(200, 80, 80))
    elif expression == "determined":
        # Straight line
        draw.line([
            (center_x - 100, mouth_y),
            (center_x + 100, mouth_y)
        ], fill=(150, 100, 100), width=12)
    else:  # neutral
        # Slight smile
        draw.arc([
            (center_x - 80, mouth_y - 30),
            (center_x + 80, mouth_y + 30)
        ], start=0, end=180, fill=(150, 100, 100), width=10)

    # Body (blue t-shirt)
    shirt_color = (70, 130, 180)
    draw.rectangle([
        (center_x - head_radius - 20, center_y + head_radius - 100),
        (center_x + head_radius + 20, center_y + head_radius + 300)
    ], fill=shirt_color)

    # Arms
    draw.ellipse([
        (center_x - head_radius - 100, center_y + head_radius - 50),
        (center_x - head_radius, center_y + head_radius + 200)
    ], fill=shirt_color)
    draw.ellipse([
        (center_x + head_radius, center_y + head_radius - 50),
        (center_x + head_radius + 100, center_y + head_radius + 200)
    ], fill=shirt_color)

    # Hands
    draw.ellipse([
        (center_x - head_radius - 120, center_y + head_radius + 150),
        (center_x - head_radius - 40, center_y + head_radius + 230)
    ], fill=skin_color)
    draw.ellipse([
        (center_x + head_radius + 40, center_y + head_radius + 150),
        (center_x + head_radius + 120, center_y + head_radius + 230)
    ], fill=skin_color)

def draw_character_paula(draw, expression, size):
    """Draw Paula (girl) with given expression"""
    center_x, center_y = size // 2, size // 2

    # Skin tone (medium)
    skin_color = (205, 164, 130)

    # Head
    head_radius = size // 4
    draw.ellipse([
        (center_x - head_radius, center_y - head_radius - 100),
        (center_x + head_radius, center_y + head_radius - 100)
    ], fill=skin_color)

    # Hair (long, dark brown with ponytails)
    hair_color = (40, 20, 10)
    # Main hair
    draw.ellipse([
        (center_x - head_radius - 30, center_y - head_radius - 150),
        (center_x + head_radius + 30, center_y + head_radius + 50)
    ], fill=hair_color)
    # Left ponytail
    draw.ellipse([
        (center_x - head_radius - 100, center_y - head_radius - 50),
        (center_x - head_radius - 20, center_y + 50)
    ], fill=hair_color)
    # Right ponytail
    draw.ellipse([
        (center_x + head_radius + 20, center_y - head_radius - 50),
        (center_x + head_radius + 100, center_y + 50)
    ], fill=hair_color)

    # Face (re-draw over hair)
    draw.ellipse([
        (center_x - head_radius + 20, center_y - head_radius - 80),
        (center_x + head_radius - 20, center_y + head_radius - 120)
    ], fill=skin_color)

    # Eyes (larger, more expressive)
    eye_y = center_y - 80
    eye_spacing = 75

    for side in [-1, 1]:
        x_pos = center_x + side * eye_spacing
        draw.ellipse([
            (x_pos - 45, eye_y - 35),
            (x_pos + 45, eye_y + 35)
        ], fill=(255, 255, 255))
        draw.ellipse([
            (x_pos - 22, eye_y - 18),
            (x_pos + 22, eye_y + 18)
        ], fill=(80, 40, 20))
        # Eyelashes
        for i in range(3):
            draw.line([
                (x_pos - 30 + i * 30, eye_y - 40),
                (x_pos - 30 + i * 30, eye_y - 55)
            ], fill=(0, 0, 0), width=3)

    # Mouth
    mouth_y = center_y + 50
    if expression == "happy":
        draw.arc([
            (center_x - 90, mouth_y - 45),
            (center_x + 90, mouth_y + 45)
        ], start=0, end=180, fill=(220, 100, 100), width=12)
    elif expression == "sad":
        draw.arc([
            (center_x - 90, mouth_y - 45),
            (center_x + 90, mouth_y + 45)
        ], start=180, end=360, fill=(160, 110, 110), width=12)
    elif expression == "excited":
        draw.ellipse([
            (center_x - 70, mouth_y - 35),
            (center_x + 70, mouth_y + 35)
        ], fill=(220, 100, 100))
    elif expression == "determined":
        draw.line([
            (center_x - 90, mouth_y),
            (center_x + 90, mouth_y)
        ], fill=(160, 110, 110), width=10)
    else:  # neutral
        draw.arc([
            (center_x - 70, mouth_y - 30),
            (center_x + 70, mouth_y + 30)
        ], start=0, end=180, fill=(160, 110, 110), width=8)

    # Body (pink dress)
    dress_color = (255, 182, 193)
    draw.polygon([
        (center_x - head_radius - 30, center_y + head_radius - 100),
        (center_x + head_radius + 30, center_y + head_radius - 100),
        (center_x + head_radius + 80, center_y + head_radius + 300),
        (center_x - head_radius - 80, center_y + head_radius + 300)
    ], fill=dress_color)

    # Arms
    draw.ellipse([
        (center_x - head_radius - 110, center_y + head_radius - 50),
        (center_x - head_radius - 20, center_y + head_radius + 180)
    ], fill=dress_color)
    draw.ellipse([
        (center_x + head_radius + 20, center_y + head_radius - 50),
        (center_x + head_radius + 110, center_y + head_radius + 180)
    ], fill=dress_color)

    # Hands
    draw.ellipse([
        (center_x - head_radius - 130, center_y + head_radius + 140),
        (center_x - head_radius - 50, center_y + head_radius + 220)
    ], fill=skin_color)
    draw.ellipse([
        (center_x + head_radius + 50, center_y + head_radius + 140),
        (center_x + head_radius + 130, center_y + head_radius + 220)
    ], fill=skin_color)

def draw_character_isabella(draw, expression, size):
    """Draw Isabella (adopted girl) with given expression"""
    center_x, center_y = size // 2, size // 2

    # Skin tone (light)
    skin_color = (255, 220, 180)

    # Head
    head_radius = size // 4
    draw.ellipse([
        (center_x - head_radius, center_y - head_radius - 100),
        (center_x + head_radius, center_y + head_radius - 100)
    ], fill=skin_color)

    # Hair (blonde, short with bow)
    hair_color = (240, 220, 130)
    draw.ellipse([
        (center_x - head_radius - 20, center_y - head_radius - 140),
        (center_x + head_radius + 20, center_y + head_radius + 30)
    ], fill=hair_color)

    # Bow (red)
    bow_y = center_y - head_radius - 120
    draw.ellipse([
        (center_x - 80, bow_y - 40),
        (center_x - 20, bow_y + 40)
    ], fill=(220, 20, 60))
    draw.ellipse([
        (center_x + 20, bow_y - 40),
        (center_x + 80, bow_y + 40)
    ], fill=(220, 20, 60))
    draw.ellipse([
        (center_x - 30, bow_y - 20),
        (center_x + 30, bow_y + 20)
    ], fill=(180, 10, 40))

    # Face
    draw.ellipse([
        (center_x - head_radius + 15, center_y - head_radius - 85),
        (center_x + head_radius - 15, center_y + head_radius - 115)
    ], fill=skin_color)

    # Eyes (big, hopeful)
    eye_y = center_y - 80
    eye_spacing = 70

    for side in [-1, 1]:
        x_pos = center_x + side * eye_spacing
        draw.ellipse([
            (x_pos - 50, eye_y - 40),
            (x_pos + 50, eye_y + 40)
        ], fill=(255, 255, 255))
        draw.ellipse([
            (x_pos - 25, eye_y - 20),
            (x_pos + 25, eye_y + 20)
        ], fill=(100, 150, 200))  # Blue eyes
        # Shine
        draw.ellipse([
            (x_pos - 10, eye_y - 15),
            (x_pos + 5, eye_y)
        ], fill=(255, 255, 255))

    # Mouth
    mouth_y = center_y + 50
    if expression == "happy":
        draw.arc([
            (center_x - 85, mouth_y - 42),
            (center_x + 85, mouth_y + 42)
        ], start=0, end=180, fill=(230, 120, 120), width=12)
    elif expression == "sad":
        draw.arc([
            (center_x - 85, mouth_y - 42),
            (center_x + 85, mouth_y + 42)
        ], start=180, end=360, fill=(170, 120, 120), width=12)
    elif expression == "excited":
        draw.ellipse([
            (center_x - 65, mouth_y - 33),
            (center_x + 65, mouth_y + 33)
        ], fill=(230, 120, 120))
    elif expression == "hopeful":
        # Slight hopeful smile
        draw.arc([
            (center_x - 75, mouth_y - 35),
            (center_x + 75, mouth_y + 35)
        ], start=0, end=180, fill=(200, 130, 130), width=10)
    else:  # neutral
        draw.arc([
            (center_x - 65, mouth_y - 28),
            (center_x + 65, mouth_y + 28)
        ], start=0, end=180, fill=(170, 120, 120), width=8)

    # Body (purple dress)
    dress_color = (186, 85, 211)
    draw.polygon([
        (center_x - head_radius - 25, center_y + head_radius - 100),
        (center_x + head_radius + 25, center_y + head_radius - 100),
        (center_x + head_radius + 70, center_y + head_radius + 300),
        (center_x - head_radius - 70, center_y + head_radius + 300)
    ], fill=dress_color)

    # Arms
    draw.ellipse([
        (center_x - head_radius - 105, center_y + head_radius - 50),
        (center_x - head_radius - 15, center_y + head_radius + 170)
    ], fill=dress_color)
    draw.ellipse([
        (center_x + head_radius + 15, center_y + head_radius - 50),
        (center_x + head_radius + 105, center_y + head_radius + 170)
    ], fill=dress_color)

    # Hands
    draw.ellipse([
        (center_x - head_radius - 125, center_y + head_radius + 130),
        (center_x - head_radius - 45, center_y + head_radius + 210)
    ], fill=skin_color)
    draw.ellipse([
        (center_x + head_radius + 45, center_y + head_radius + 130),
        (center_x + head_radius + 125, center_y + head_radius + 210)
    ], fill=skin_color)

def draw_character_xolo(draw, expression, size):
    """Draw Xolo (axolotl guide)"""
    center_x, center_y = size // 2, size // 2

    # Body (pink axolotl color)
    body_color = (255, 182, 193)

    # Main body (horizontal ellipse)
    body_width = size // 3
    body_height = size // 4
    draw.ellipse([
        (center_x - body_width, center_y - body_height),
        (center_x + body_width, center_y + body_height)
    ], fill=body_color)

    # Head (larger at left side)
    head_radius = size // 5
    draw.ellipse([
        (center_x - body_width - head_radius // 2, center_y - head_radius),
        (center_x - body_width + head_radius * 2, center_y + head_radius)
    ], fill=body_color)

    # Gills (feathery protrusions)
    gill_color = (255, 105, 180)
    for i in range(-2, 3):
        y_offset = i * 40
        # Left gills
        draw.ellipse([
            (center_x - body_width - head_radius - 80, center_y + y_offset - 20),
            (center_x - body_width - head_radius, center_y + y_offset + 20)
        ], fill=gill_color)
        # Right gills
        draw.ellipse([
            (center_x - body_width - head_radius - 60, center_y + y_offset - 15),
            (center_x - body_width - head_radius - 20, center_y + y_offset + 15)
        ], fill=gill_color)

    # Eyes
    eye_y = center_y - 50
    eye_x = center_x - body_width + head_radius // 2

    # Left eye
    draw.ellipse([
        (eye_x - 60, eye_y - 30),
        (eye_x - 10, eye_y + 30)
    ], fill=(50, 50, 50))
    draw.ellipse([
        (eye_x - 50, eye_y - 10),
        (eye_x - 30, eye_y + 10)
    ], fill=(255, 255, 255))

    # Right eye
    draw.ellipse([
        (eye_x + 10, eye_y - 30),
        (eye_x + 60, eye_y + 30)
    ], fill=(50, 50, 50))
    draw.ellipse([
        (eye_x + 30, eye_y - 10),
        (eye_x + 50, eye_y + 10)
    ], fill=(255, 255, 255))

    # Mouth
    mouth_y = center_y + 40
    if expression == "wise":
        # Slight knowing smile
        draw.arc([
            (eye_x - 40, mouth_y - 25),
            (eye_x + 80, mouth_y + 25)
        ], start=0, end=180, fill=(200, 100, 150), width=8)
    elif expression == "playful":
        # Big grin
        draw.arc([
            (eye_x - 50, mouth_y - 30),
            (eye_x + 90, mouth_y + 30)
        ], start=0, end=180, fill=(220, 100, 150), width=10)
    else:  # neutral
        # Gentle smile
        draw.arc([
            (eye_x - 35, mouth_y - 20),
            (eye_x + 75, mouth_y + 20)
        ], start=0, end=180, fill=(180, 100, 140), width=7)

    # Legs (small)
    leg_positions = [
        (center_x - body_width // 2, center_y + body_height),
        (center_x, center_y + body_height),
        (center_x + body_width // 2, center_y + body_height)
    ]
    for leg_x, leg_y in leg_positions:
        draw.ellipse([
            (leg_x - 40, leg_y - 20),
            (leg_x + 40, leg_y + 80)
        ], fill=body_color)
        # Toes
        for i in range(3):
            draw.ellipse([
                (leg_x - 30 + i * 30, leg_y + 70),
                (leg_x - 10 + i * 30, leg_y + 100)
            ], fill=(240, 160, 180))

    # Tail
    tail_points = [
        (center_x + body_width, center_y - 50),
        (center_x + body_width + 150, center_y - 100),
        (center_x + body_width + 200, center_y),
        (center_x + body_width + 150, center_y + 100),
        (center_x + body_width, center_y + 50)
    ]
    draw.polygon(tail_points, fill=body_color)

def draw_character_don_bowser(draw, expression, size):
    """Draw Don Bowser (antagonist)"""
    center_x, center_y = size // 2, size // 2

    # Skin (greenish, turtle-like)
    skin_color = (100, 140, 80)

    # Head (large, square jaw)
    head_size = size // 3
    draw.rectangle([
        (center_x - head_size, center_y - head_size - 100),
        (center_x + head_size, center_y + head_size - 100)
    ], fill=skin_color)

    # Horns/spikes on head
    spike_color = (160, 100, 40)
    for i in range(-2, 3):
        x_offset = i * 80
        draw.polygon([
            (center_x + x_offset - 30, center_y - head_size - 100),
            (center_x + x_offset + 30, center_y - head_size - 100),
            (center_x + x_offset, center_y - head_size - 180)
        ], fill=spike_color)

    # Eyes
    eye_y = center_y - 100
    eye_spacing = 100

    if expression == "angry":
        # Angry slanted eyes
        for side in [-1, 1]:
            x_pos = center_x + side * eye_spacing
            draw.ellipse([
                (x_pos - 50, eye_y - 35),
                (x_pos + 50, eye_y + 35)
            ], fill=(255, 0, 0))
            draw.ellipse([
                (x_pos - 25, eye_y - 15),
                (x_pos + 25, eye_y + 15)
            ], fill=(0, 0, 0))
            # Angry eyebrow
            draw.line([
                (x_pos - 60, eye_y - 50),
                (x_pos + 60, eye_y - 40)
            ], fill=(70, 100, 50), width=12)
    else:  # smug
        # Half-closed eyes
        for side in [-1, 1]:
            x_pos = center_x + side * eye_spacing
            draw.ellipse([
                (x_pos - 45, eye_y - 20),
                (x_pos + 45, eye_y + 30)
            ], fill=(255, 255, 0))
            draw.ellipse([
                (x_pos - 22, eye_y - 10),
                (x_pos + 22, eye_y + 15)
            ], fill=(0, 0, 0))

    # Mouth
    mouth_y = center_y + 80
    if expression == "angry":
        # Growling mouth
        draw.arc([
            (center_x - 120, mouth_y - 60),
            (center_x + 120, mouth_y + 60)
        ], start=180, end=360, fill=(150, 50, 50), width=15)
        # Teeth
        for i in range(8):
            draw.polygon([
                (center_x - 100 + i * 30, mouth_y - 10),
                (center_x - 100 + i * 30 + 15, mouth_y - 10),
                (center_x - 100 + i * 30 + 7, mouth_y - 40)
            ], fill=(255, 255, 255))
    else:  # smug
        # Smirk
        draw.arc([
            (center_x - 100, mouth_y - 40),
            (center_x + 120, mouth_y + 60)
        ], start=0, end=150, fill=(150, 50, 50), width=12)

    # Body (suit)
    suit_color = (40, 40, 40)
    draw.rectangle([
        (center_x - head_size - 50, center_y + head_size - 100),
        (center_x + head_size + 50, center_y + head_size + 350)
    ], fill=suit_color)

    # Tie (red)
    draw.polygon([
        (center_x - 40, center_y + head_size - 100),
        (center_x + 40, center_y + head_size - 100),
        (center_x + 20, center_y + head_size + 200),
        (center_x - 20, center_y + head_size + 200)
    ], fill=(180, 0, 0))

    # Arms
    draw.rectangle([
        (center_x - head_size - 150, center_y + head_size - 50),
        (center_x - head_size - 50, center_y + head_size + 200)
    ], fill=suit_color)
    draw.rectangle([
        (center_x + head_size + 50, center_y + head_size - 50),
        (center_x + head_size + 150, center_y + head_size + 200)
    ], fill=suit_color)

    # Hands (clenched fists)
    draw.ellipse([
        (center_x - head_size - 170, center_y + head_size + 150),
        (center_x - head_size - 70, center_y + head_size + 250)
    ], fill=skin_color)
    draw.ellipse([
        (center_x + head_size + 70, center_y + head_size + 150),
        (center_x + head_size + 170, center_y + head_size + 250)
    ], fill=skin_color)

def draw_character_koopa_hielo(draw, expression, size):
    """Draw Koopa Hielo (ice guard)"""
    center_x, center_y = size // 2, size // 2

    # Body (ice blue shell)
    shell_color = (173, 216, 230)
    body_color = (144, 238, 144)

    # Shell (large circle)
    shell_radius = size // 4
    draw.ellipse([
        (center_x - shell_radius, center_y - shell_radius + 50),
        (center_x + shell_radius, center_y + shell_radius + 50)
    ], fill=shell_color)

    # Shell pattern (hexagons)
    pattern_color = (135, 206, 250)
    draw.ellipse([
        (center_x - shell_radius // 2, center_y - shell_radius // 2 + 50),
        (center_x + shell_radius // 2, center_y + shell_radius // 2 + 50)
    ], fill=pattern_color)

    # Head (above shell)
    head_radius = size // 6
    draw.ellipse([
        (center_x - head_radius, center_y - shell_radius - head_radius + 50),
        (center_x + head_radius, center_y - shell_radius + head_radius // 2 + 50)
    ], fill=body_color)

    # Eyes
    eye_y = center_y - shell_radius - head_radius // 2 + 50
    eye_spacing = 50

    if expression == "chase":
        # Angry, focused eyes
        for side in [-1, 1]:
            x_pos = center_x + side * eye_spacing
            draw.ellipse([
                (x_pos - 30, eye_y - 25),
                (x_pos + 30, eye_y + 25)
            ], fill=(255, 255, 255))
            draw.ellipse([
                (x_pos - 15, eye_y - 12),
                (x_pos + 15, eye_y + 12)
            ], fill=(255, 0, 0))
    else:  # guard
        # Alert eyes
        for side in [-1, 1]:
            x_pos = center_x + side * eye_spacing
            draw.ellipse([
                (x_pos - 28, eye_y - 28),
                (x_pos + 28, eye_y + 28)
            ], fill=(255, 255, 255))
            draw.ellipse([
                (x_pos - 14, eye_y - 14),
                (x_pos + 14, eye_y + 14)
            ], fill=(0, 0, 0))

    # Mouth
    mouth_y = center_y - shell_radius + head_radius // 2 + 30
    draw.arc([
        (center_x - 40, mouth_y - 20),
        (center_x + 40, mouth_y + 20)
    ], start=0, end=180, fill=(100, 150, 100), width=8)

    # Arms (from shell)
    arm_y = center_y + 50
    draw.ellipse([
        (center_x - shell_radius - 80, arm_y - 40),
        (center_x - shell_radius, arm_y + 120)
    ], fill=body_color)
    draw.ellipse([
        (center_x + shell_radius, arm_y - 40),
        (center_x + shell_radius + 80, arm_y + 120)
    ], fill=body_color)

    # Legs
    leg_y = center_y + shell_radius + 50
    draw.ellipse([
        (center_x - 80, leg_y),
        (center_x - 20, leg_y + 150)
    ], fill=body_color)
    draw.ellipse([
        (center_x + 20, leg_y),
        (center_x + 80, leg_y + 150)
    ], fill=body_color)

    # Add icy effects (snowflakes around character if chasing)
    if expression == "chase":
        import random
        random.seed(42)  # Consistent placement
        for _ in range(15):
            sx = random.randint(100, size - 100)
            sy = random.randint(100, size - 100)
            draw.line([
                (sx - 20, sy), (sx + 20, sy)
            ], fill=(200, 230, 255), width=4)
            draw.line([
                (sx, sy - 20), (sx, sy + 20)
            ], fill=(200, 230, 255), width=4)
            draw.line([
                (sx - 14, sy - 14), (sx + 14, sy + 14)
            ], fill=(200, 230, 255), width=4)
            draw.line([
                (sx - 14, sy + 14), (sx + 14, sy - 14)
            ], fill=(200, 230, 255), width=4)

def generate_all_characters():
    """Generate all 22 character images"""

    os.makedirs("assets/images/characters", exist_ok=True)

    characters = [
        # Pepe (boy) - 5 expressions
        ("pepe", "neutral", draw_character_pepe),
        ("pepe", "happy", draw_character_pepe),
        ("pepe", "sad", draw_character_pepe),
        ("pepe", "excited", draw_character_pepe),
        ("pepe", "determined", draw_character_pepe),

        # Paula (girl) - 5 expressions
        ("paula", "neutral", draw_character_paula),
        ("paula", "happy", draw_character_paula),
        ("paula", "sad", draw_character_paula),
        ("paula", "excited", draw_character_paula),
        ("paula", "determined", draw_character_paula),

        # Isabella (adopted girl) - 5 expressions
        ("isabella", "neutral", draw_character_isabella),
        ("isabella", "happy", draw_character_isabella),
        ("isabella", "sad", draw_character_isabella),
        ("isabella", "excited", draw_character_isabella),
        ("isabella", "hopeful", draw_character_isabella),

        # Xolo (axolotl) - 3 expressions
        ("xolo", "neutral", draw_character_xolo),
        ("xolo", "wise", draw_character_xolo),
        ("xolo", "playful", draw_character_xolo),

        # Don Bowser (antagonist) - 2 expressions
        ("don_bowser", "angry", draw_character_don_bowser),
        ("don_bowser", "smug", draw_character_don_bowser),

        # Koopa Hielo (guard) - 2 expressions
        ("koopa_hielo", "guard", draw_character_koopa_hielo),
        ("koopa_hielo", "chase", draw_character_koopa_hielo),
    ]

    print(f"🎨 Generating {len(characters)} character images...")

    for i, (name, expression, draw_func) in enumerate(characters, 1):
        filename = f"{name}_{expression}.png"
        filepath = f"assets/images/characters/{filename}"

        print(f"  [{i}/{len(characters)}] Creating {filename}...")

        # Create image with transparent background
        img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Draw character
        draw_func(draw, expression, SIZE)

        # Save
        img.save(filepath, "PNG", optimize=True)
        print(f"    ✅ Saved to {filepath}")

    print(f"\n🎉 All {len(characters)} characters generated successfully!")

if __name__ == "__main__":
    generate_all_characters()
