#!/usr/bin/env python3
"""
Generate all 19 audio files for Hope Quest
Simple synthesized audio using pure Python (no external libraries)
"""

import wave
import struct
import math
import os

SAMPLE_RATE = 44100

def generate_sine_wave(frequency, duration, volume=0.5):
    """Generate a sine wave"""
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sample = int(volume * 32767 * math.sin(2 * math.pi * frequency * t))
        samples.append(sample)
    return samples

def generate_chord(frequencies, duration, volume=0.3):
    """Generate a chord (multiple frequencies)"""
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sample = 0
        for freq in frequencies:
            sample += volume * 32767 * math.sin(2 * math.pi * freq * t) / len(frequencies)
        samples.append(int(sample))
    return samples

def generate_sweep(start_freq, end_freq, duration, volume=0.5):
    """Generate a frequency sweep"""
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Linear frequency sweep
        freq = start_freq + (end_freq - start_freq) * (t / duration)
        sample = int(volume * 32767 * math.sin(2 * math.pi * freq * t))
        samples.append(sample)
    return samples

def apply_fade(samples, fade_in_duration=0.05, fade_out_duration=0.05):
    """Apply fade in/out to prevent clicks"""
    fade_in_samples = int(SAMPLE_RATE * fade_in_duration)
    fade_out_samples = int(SAMPLE_RATE * fade_out_duration)

    # Fade in
    for i in range(min(fade_in_samples, len(samples))):
        samples[i] = int(samples[i] * (i / fade_in_samples))

    # Fade out
    for i in range(min(fade_out_samples, len(samples))):
        idx = len(samples) - 1 - i
        samples[idx] = int(samples[idx] * (i / fade_out_samples))

    return samples

def write_wav(filename, samples):
    """Write samples to WAV file"""
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(SAMPLE_RATE)
        for sample in samples:
            wav_file.writeframes(struct.pack('h', sample))

def generate_button_press():
    """Short click sound"""
    samples = generate_sine_wave(800, 0.05, 0.3)
    samples += generate_sine_wave(400, 0.05, 0.2)
    return apply_fade(samples, 0.01, 0.01)

def generate_button_hover():
    """Subtle hover sound"""
    samples = generate_sine_wave(600, 0.05, 0.2)
    return apply_fade(samples, 0.01, 0.01)

def generate_portal_select():
    """Portal selection sound"""
    samples = generate_sweep(200, 800, 0.3, 0.4)
    return apply_fade(samples)

def generate_portal_enter():
    """Portal entry sound (whoosh)"""
    samples = []
    # Downward sweep for "whoosh" effect
    samples += generate_sweep(1000, 100, 0.8, 0.5)
    # Add some harmonics
    samples += generate_sweep(1500, 150, 0.5, 0.3)
    return apply_fade(samples[:int(SAMPLE_RATE * 1.5)], 0.1, 0.2)

def generate_level_complete():
    """Level complete fanfare"""
    samples = []
    # C major arpeggio (C-E-G-C)
    notes = [523, 659, 784, 1047]  # C5, E5, G5, C6
    for note in notes:
        samples += generate_sine_wave(note, 0.3, 0.4)
    return apply_fade(samples)

def generate_achievement_unlock():
    """Achievement unlock sound"""
    samples = []
    # Triumphant rising chord
    chord1 = [440, 554, 659]  # A-C#-E
    chord2 = [523, 659, 784]  # C-E-G
    samples += generate_chord(chord1, 0.4, 0.35)
    samples += generate_chord(chord2, 0.6, 0.4)
    return apply_fade(samples)

def generate_coin_collect():
    """Coin pickup sound"""
    samples = generate_sweep(400, 800, 0.15, 0.4)
    return apply_fade(samples, 0.01, 0.03)

def generate_star_earn():
    """Star earned sound"""
    samples = []
    # Sparkling effect with multiple frequencies
    for freq in [800, 1000, 1200, 1400]:
        samples += generate_sine_wave(freq, 0.08, 0.25)
    return apply_fade(samples[:int(SAMPLE_RATE * 0.5)])

def generate_error():
    """Error sound"""
    samples = []
    # Low dissonant tone
    samples += generate_chord([200, 205], 0.3, 0.4)
    return apply_fade(samples)

def generate_success():
    """Success sound"""
    samples = []
    # Happy ascending notes
    samples += generate_sine_wave(523, 0.15, 0.4)  # C
    samples += generate_sine_wave(659, 0.15, 0.4)  # E
    samples += generate_sine_wave(784, 0.2, 0.5)   # G
    return apply_fade(samples)

def generate_companion_meet():
    """Companion meeting sound"""
    samples = []
    # Friendly melody
    notes = [523, 587, 659, 784]  # C-D-E-G
    for note in notes:
        samples += generate_sine_wave(note, 0.4, 0.35)
    return apply_fade(samples)

def generate_checkpoint_pass():
    """Checkpoint pass sound"""
    samples = []
    # Positive upward sweep
    samples += generate_sweep(300, 600, 0.5, 0.4)
    samples += generate_sine_wave(600, 0.3, 0.4)
    return apply_fade(samples)

def generate_checkpoint_fail():
    """Checkpoint fail sound"""
    samples = []
    # Descending negative tone
    samples += generate_sweep(600, 200, 0.6, 0.4)
    return apply_fade(samples)

def generate_menu_music():
    """Menu background music (simple melody loop)"""
    samples = []
    # Simple C major melody
    melody = [
        (523, 0.5), (659, 0.5), (784, 0.5), (659, 0.5),  # C E G E
        (523, 0.5), (659, 0.5), (784, 1.0),              # C E G
        (587, 0.5), (698, 0.5), (784, 0.5), (698, 0.5),  # D F G F
        (587, 0.5), (659, 0.5), (523, 1.0),              # D E C
    ]
    # Repeat 4 times for ~20 seconds
    for _ in range(4):
        for freq, duration in melody:
            samples += generate_sine_wave(freq, duration, 0.25)
            # Add harmonics for richness
            samples += generate_sine_wave(freq * 2, duration, 0.1)
    return apply_fade(samples[:int(SAMPLE_RATE * 20)], 0.5, 0.5)

def generate_map_music():
    """Map background music"""
    samples = []
    # World exploration theme (pentatonic scale)
    melody = [
        (392, 0.6), (440, 0.6), (523, 0.6), (587, 0.6),  # G A C D
        (523, 0.6), (440, 0.6), (392, 1.2),              # C A G
        (440, 0.6), (523, 0.6), (587, 0.6), (659, 0.6),  # A C D E
        (587, 0.6), (523, 0.6), (440, 1.2),              # D C A
    ]
    # Repeat 4 times
    for _ in range(4):
        for freq, duration in melody:
            samples += generate_sine_wave(freq, duration, 0.22)
            # Bass note (octave down)
            samples += generate_sine_wave(freq / 2, duration, 0.15)
    return apply_fade(samples[:int(SAMPLE_RATE * 22)], 0.5, 0.5)

def generate_portal_music():
    """Portal selection music"""
    samples = []
    # Mysterious, anticipatory melody
    melody = [
        (330, 0.5), (370, 0.5), (415, 0.5), (494, 0.5),  # E F# G# B
        (415, 0.5), (370, 0.5), (330, 1.0),              # G# F# E
        (370, 0.5), (415, 0.5), (494, 0.5), (587, 0.5),  # F# G# B D
        (494, 0.5), (415, 0.5), (370, 1.0),              # B G# F#
    ]
    # Repeat 3 times
    for _ in range(3):
        for freq, duration in melody:
            samples += generate_sine_wave(freq, duration, 0.25)
    return apply_fade(samples[:int(SAMPLE_RATE * 18)], 0.5, 0.5)

def generate_activity_music():
    """Activity gameplay music"""
    samples = []
    # Upbeat, focused melody
    melody = [
        (523, 0.4), (523, 0.4), (587, 0.4), (659, 0.4),  # C C D E
        (659, 0.4), (587, 0.4), (523, 0.8),              # E D C
        (587, 0.4), (587, 0.4), (659, 0.4), (698, 0.4),  # D D E F
        (698, 0.4), (659, 0.4), (587, 0.8),              # F E D
    ]
    # Repeat 5 times for ~20 seconds
    for _ in range(5):
        for freq, duration in melody:
            samples += generate_sine_wave(freq, duration, 0.23)
            # Add rhythm with higher octave
            samples += generate_sine_wave(freq * 2, duration, 0.12)
    return apply_fade(samples[:int(SAMPLE_RATE * 20)], 0.5, 0.5)

def generate_victory_music():
    """Victory celebration music"""
    samples = []
    # Triumphant fanfare
    fanfare = [
        (523, 0.3), (659, 0.3), (784, 0.3), (1047, 0.6),  # C E G C
        (784, 0.3), (1047, 0.6), (1047, 1.2),             # G C C
    ]
    for freq, duration in fanfare:
        samples += generate_chord([freq, freq * 1.25, freq * 1.5], duration, 0.35)
    return apply_fade(samples[:int(SAMPLE_RATE * 4)], 0.2, 0.5)

def generate_defeat_music():
    """Defeat/retry music"""
    samples = []
    # Sad descending melody
    melody = [
        (659, 0.5), (587, 0.5), (523, 0.5), (494, 1.0),  # E D C B
        (440, 0.5), (392, 0.5), (349, 1.5),              # A G F
    ]
    for freq, duration in melody:
        samples += generate_sine_wave(freq, duration, 0.28)
        # Somber harmony
        samples += generate_sine_wave(freq * 0.8, duration, 0.18)
    return apply_fade(samples[:int(SAMPLE_RATE * 5)], 0.3, 1.0)

def generate_all_audio():
    """Generate all 19 audio files"""

    # Create directories
    os.makedirs("assets/audio/music", exist_ok=True)
    os.makedirs("assets/audio/sfx", exist_ok=True)

    audio_files = {
        # Music (6 tracks)
        "assets/audio/music/menu.wav": generate_menu_music,
        "assets/audio/music/map.wav": generate_map_music,
        "assets/audio/music/portal.wav": generate_portal_music,
        "assets/audio/music/activity.wav": generate_activity_music,
        "assets/audio/music/victory.wav": generate_victory_music,
        "assets/audio/music/defeat.wav": generate_defeat_music,

        # SFX (13 effects)
        "assets/audio/sfx/button_press.wav": generate_button_press,
        "assets/audio/sfx/button_hover.wav": generate_button_hover,
        "assets/audio/sfx/portal_select.wav": generate_portal_select,
        "assets/audio/sfx/portal_enter.wav": generate_portal_enter,
        "assets/audio/sfx/level_complete.wav": generate_level_complete,
        "assets/audio/sfx/achievement_unlock.wav": generate_achievement_unlock,
        "assets/audio/sfx/coin_collect.wav": generate_coin_collect,
        "assets/audio/sfx/star_earn.wav": generate_star_earn,
        "assets/audio/sfx/error.wav": generate_error,
        "assets/audio/sfx/success.wav": generate_success,
        "assets/audio/sfx/companion_meet.wav": generate_companion_meet,
        "assets/audio/sfx/checkpoint_pass.wav": generate_checkpoint_pass,
        "assets/audio/sfx/checkpoint_fail.wav": generate_checkpoint_fail,
    }

    print(f"🎵 Generating {len(audio_files)} audio files...")

    for i, (filepath, generator_func) in enumerate(audio_files.items(), 1):
        print(f"  [{i}/{len(audio_files)}] Creating {os.path.basename(filepath)}...")

        samples = generator_func()
        write_wav(filepath, samples)

        size = os.path.getsize(filepath)
        duration = len(samples) / SAMPLE_RATE
        print(f"    ✅ Saved to {filepath} ({size} bytes, {duration:.1f}s)")

    print(f"\n🎉 All {len(audio_files)} audio files generated successfully!")
    print("\nNote: These are WAV files. React Native Expo supports WAV natively.")
    print("If you need MP3, convert using: ffmpeg -i input.wav -b:a 128k output.mp3")

if __name__ == "__main__":
    generate_all_audio()
