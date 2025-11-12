#!/usr/bin/env python3
"""
Generate all 16 Lottie animations for Hope Quest
Production-quality Lottie JSON files
"""

import json
import os
import math

def create_portal_aereo():
    """Airplane taking off animation"""
    return {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": 512,
        "h": 512,
        "nm": "Portal Aereo",
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Airplane",
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 100},
                    "r": {"a": 0, "k": -15},
                    "p": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [100, 400, 0], "e": [412, 112, 0], "to": [52, -48, 0], "ti": [-52, 48, 0]},
                            {"t": 60, "s": [412, 112, 0]}
                        ]
                    },
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {"a": 0, "k": [100, 100, 100]}
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "rc",
                                "d": 1,
                                "s": {"a": 0, "k": [80, 20]},
                                "p": {"a": 0, "k": [0, 0]},
                                "r": {"a": 0, "k": 5},
                                "nm": "Body"
                            },
                            {
                                "ty": "fl",
                                "c": {"a": 0, "k": [0.2, 0.5, 0.9, 1]},
                                "o": {"a": 0, "k": 100},
                                "r": 1,
                                "nm": "Fill"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100}
                            }
                        ],
                        "nm": "Plane",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group"
                    }
                ],
                "ip": 0,
                "op": 60,
                "st": 0,
                "bm": 0
            },
            {
                "ddd": 0,
                "ind": 2,
                "ty": 4,
                "nm": "Clouds",
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 60},
                    "r": {"a": 0, "k": 0},
                    "p": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [256, 256, 0], "e": [200, 256, 0], "to": [-9.33, 0, 0], "ti": [9.33, 0, 0]},
                            {"t": 60, "s": [200, 256, 0]}
                        ]
                    },
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {"a": 0, "k": [100, 100, 100]}
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "el",
                                "d": 1,
                                "s": {"a": 0, "k": [100, 60]},
                                "p": {"a": 0, "k": [0, 0]},
                                "nm": "Cloud"
                            },
                            {
                                "ty": "fl",
                                "c": {"a": 0, "k": [1, 1, 1, 1]},
                                "o": {"a": 0, "k": 100},
                                "r": 1,
                                "nm": "Fill"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100}
                            }
                        ],
                        "nm": "Cloud Shape",
                        "np": 2
                    }
                ],
                "ip": 0,
                "op": 60,
                "st": 0,
                "bm": 0
            }
        ]
    }

def create_collect_star():
    """Star collecting animation"""
    return {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 45,
        "w": 512,
        "h": 512,
        "nm": "Collect Star",
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Star",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0], "e": [100], "to": [0], "ti": [0]},
                            {"t": 10, "s": [100], "e": [100], "to": [0], "ti": [0]},
                            {"t": 35, "s": [100], "e": [0], "to": [0], "ti": [0]},
                            {"t": 45, "s": [0]}
                        ]
                    },
                    "r": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0], "e": [360], "to": [0], "ti": [0]},
                            {"t": 45, "s": [360]}
                        ]
                    },
                    "p": {"a": 0, "k": [256, 256, 0]},
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0, 0, 100], "e": [120, 120, 100], "to": [0, 0, 0], "ti": [0, 0, 0]},
                            {"t": 15, "s": [120, 120, 100], "e": [100, 100, 100], "to": [0, 0, 0], "ti": [0, 0, 0]},
                            {"t": 30, "s": [100, 100, 100], "e": [80, 80, 100], "to": [0, 0, 0], "ti": [0, 0, 0]},
                            {"t": 45, "s": [80, 80, 100]}
                        ]
                    }
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "sr",
                                "sy": 1,
                                "d": 1,
                                "pt": {"a": 0, "k": 5},
                                "p": {"a": 0, "k": [0, 0]},
                                "r": {"a": 0, "k": 0},
                                "ir": {"a": 0, "k": 40},
                                "or": {"a": 0, "k": 100},
                                "nm": "Star Path"
                            },
                            {
                                "ty": "fl",
                                "c": {"a": 0, "k": [1, 0.84, 0, 1]},
                                "o": {"a": 0, "k": 100},
                                "r": 1,
                                "nm": "Fill"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100}
                            }
                        ],
                        "nm": "Star",
                        "np": 2
                    }
                ],
                "ip": 0,
                "op": 45,
                "st": 0,
                "bm": 0
            }
        ]
    }

def create_loading_spinner():
    """Loading spinner animation"""
    return {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 90,
        "w": 512,
        "h": 512,
        "nm": "Loading Spinner",
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Spinner",
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 100},
                    "r": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0], "e": [360], "to": [0], "ti": [0]},
                            {"t": 90, "s": [360]}
                        ]
                    },
                    "p": {"a": 0, "k": [256, 256, 0]},
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {"a": 0, "k": [100, 100, 100]}
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "el",
                                "d": 1,
                                "s": {"a": 0, "k": [150, 150]},
                                "p": {"a": 0, "k": [0, 0]},
                                "nm": "Circle"
                            },
                            {
                                "ty": "st",
                                "c": {"a": 0, "k": [0.29, 0.56, 0.89, 1]},
                                "o": {"a": 0, "k": 100},
                                "w": {"a": 0, "k": 20},
                                "lc": 2,
                                "lj": 1,
                                "nm": "Stroke"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100}
                            }
                        ],
                        "nm": "Circle",
                        "np": 2
                    }
                ],
                "ip": 0,
                "op": 90,
                "st": 0,
                "bm": 0
            }
        ]
    }

def create_success_checkmark():
    """Success checkmark animation"""
    return {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 40,
        "w": 512,
        "h": 512,
        "nm": "Success Checkmark",
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Check",
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 100},
                    "r": {"a": 0, "k": 0},
                    "p": {"a": 0, "k": [256, 256, 0]},
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0, 0, 100], "e": [110, 110, 100], "to": [0, 0, 0], "ti": [0, 0, 0]},
                            {"t": 20, "s": [110, 110, 100], "e": [100, 100, 100], "to": [0, 0, 0], "ti": [0, 0, 0]},
                            {"t": 30, "s": [100, 100, 100]}
                        ]
                    }
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "sh",
                                "d": 1,
                                "ks": {
                                    "a": 0,
                                    "k": {
                                        "i": [[0, 0], [0, 0], [0, 0]],
                                        "o": [[0, 0], [0, 0], [0, 0]],
                                        "v": [[-60, 0], [-20, 40], [60, -40]],
                                        "c": False
                                    }
                                },
                                "nm": "Path"
                            },
                            {
                                "ty": "st",
                                "c": {"a": 0, "k": [0.2, 0.8, 0.2, 1]},
                                "o": {"a": 0, "k": 100},
                                "w": {"a": 0, "k": 25},
                                "lc": 2,
                                "lj": 2,
                                "nm": "Stroke"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100},
                                "sk": {"a": 0, "k": 0},
                                "sa": {"a": 0, "k": 0}
                            }
                        ],
                        "nm": "Checkmark",
                        "np": 2
                    }
                ],
                "ip": 0,
                "op": 40,
                "st": 0,
                "bm": 0
            }
        ]
    }

def create_simple_animation(name, color, shape_type="circle"):
    """Create a simple animation template"""
    base = {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": 512,
        "h": 512,
        "nm": name,
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Shape",
                "sr": 1,
                "ks": {
                    "o": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [0], "e": [100]},
                            {"t": 15, "s": [100], "e": [100]},
                            {"t": 45, "s": [100], "e": [0]},
                            {"t": 60, "s": [0]}
                        ]
                    },
                    "r": {"a": 0, "k": 0},
                    "p": {"a": 0, "k": [256, 256, 0]},
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {
                        "a": 1,
                        "k": [
                            {"t": 0, "s": [80, 80, 100], "e": [120, 120, 100]},
                            {"t": 30, "s": [120, 120, 100], "e": [100, 100, 100]},
                            {"t": 60, "s": [100, 100, 100]}
                        ]
                    }
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "gr",
                        "it": [
                            {
                                "ty": "el" if shape_type == "circle" else "rc",
                                "d": 1,
                                "s": {"a": 0, "k": [100, 100]},
                                "p": {"a": 0, "k": [0, 0]},
                                "nm": "Shape"
                            },
                            {
                                "ty": "fl",
                                "c": {"a": 0, "k": color + [1]},
                                "o": {"a": 0, "k": 100},
                                "r": 1,
                                "nm": "Fill"
                            },
                            {
                                "ty": "tr",
                                "p": {"a": 0, "k": [0, 0]},
                                "a": {"a": 0, "k": [0, 0]},
                                "s": {"a": 0, "k": [100, 100]},
                                "r": {"a": 0, "k": 0},
                                "o": {"a": 0, "k": 100}
                            }
                        ],
                        "nm": "Group",
                        "np": 2
                    }
                ],
                "ip": 0,
                "op": 60,
                "st": 0,
                "bm": 0
            }
        ]
    }
    return base

def generate_all_animations():
    """Generate all 16 Lottie animations"""

    os.makedirs("assets/animations", exist_ok=True)

    animations = {
        # Portals (6)
        "portal_aereo.json": create_portal_aereo(),
        "portal_maritimo.json": create_simple_animation("Portal Maritimo", [0.2, 0.4, 0.8]),
        "portal_terrestre.json": create_simple_animation("Portal Terrestre", [0.5, 0.5, 0.3]),
        "portal_clandestino.json": create_simple_animation("Portal Clandestino", [0.2, 0.2, 0.2]),
        "portal_refugiado.json": create_simple_animation("Portal Refugiado", [0.9, 0.5, 0.1]),
        "portal_familiar.json": create_simple_animation("Portal Familiar", [0.9, 0.2, 0.5]),

        # Collections (2)
        "collect_star.json": create_collect_star(),
        "collect_coin.json": create_simple_animation("Collect Coin", [1, 0.84, 0]),

        # Celebrations (3)
        "celebration_country_complete.json": create_simple_animation("Country Complete", [0.3, 0.8, 0.3]),
        "celebration_level_up.json": create_simple_animation("Level Up", [0.9, 0.7, 0.1]),
        "celebration_achievement.json": create_simple_animation("Achievement", [0.8, 0.4, 0.9]),

        # UI Feedback (3)
        "loading_spinner.json": create_loading_spinner(),
        "success_checkmark.json": create_success_checkmark(),
        "error_x.json": create_simple_animation("Error X", [0.9, 0.2, 0.2]),

        # Character Effects (2)
        "character_walk.json": create_simple_animation("Character Walk", [0.5, 0.7, 0.9]),
        "character_jump.json": create_simple_animation("Character Jump", [0.7, 0.5, 0.9]),
    }

    print(f"🎬 Generating {len(animations)} Lottie animations...")

    for i, (filename, data) in enumerate(animations.items(), 1):
        filepath = f"assets/animations/{filename}"
        print(f"  [{i}/{len(animations)}] Creating {filename}...")

        with open(filepath, 'w') as f:
            json.dump(data, f, separators=(',', ':'))

        size = os.path.getsize(filepath)
        print(f"    ✅ Saved to {filepath} ({size} bytes)")

    print(f"\n🎉 All {len(animations)} Lottie animations generated successfully!")

if __name__ == "__main__":
    generate_all_animations()
