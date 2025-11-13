/**
 * Audio Service
 * Servicio centralizado para música, efectos de sonido y narración
 * Utiliza expo-av para reproducción de audio
 */

import { Audio, AVPlaybackStatus } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

// Audio types
export type AudioCategory = 'music' | 'sfx' | 'narration';
export type MusicTrack = 'menu' | 'map' | 'portal' | 'activity' | 'victory' | 'defeat';
export type SFXType =
  | 'button_press'
  | 'button_hover'
  | 'portal_select'
  | 'portal_enter'
  | 'level_complete'
  | 'achievement_unlock'
  | 'coin_collect'
  | 'star_earn'
  | 'error'
  | 'success'
  | 'companion_meet'
  | 'checkpoint_pass'
  | 'checkpoint_fail';

// Volume settings
interface VolumeSettings {
  master: number;
  music: number;
  sfx: number;
  narration: number;
}

// Audio state
class AudioService {
  private musicSound: Sound | null = null;
  private currentTrack: MusicTrack | null = null;
  private sfxCache: Map<SFXType, Sound> = new Map();
  private narrationSound: Sound | null = null;

  private volumes: VolumeSettings = {
    master: 1.0,
    music: 0.7,
    sfx: 0.8,
    narration: 0.9,
  };

  private isMusicEnabled = true;
  private isSFXEnabled = true;
  private isNarrationEnabled = true;
  private isMusicFading = false;

  // Music track paths
  private musicTracks: Record<MusicTrack, any> = {
    menu: require('@/assets/audio/music/menu.wav'),
    map: require('@/assets/audio/music/map.wav'),
    portal: require('@/assets/audio/music/portal.wav'),
    activity: require('@/assets/audio/music/activity.wav'),
    victory: require('@/assets/audio/music/victory.wav'),
    defeat: require('@/assets/audio/music/defeat.wav'),
  };

  // SFX paths
  private sfxPaths: Record<SFXType, any> = {
    button_press: require('@/assets/audio/sfx/button_press.wav'),
    button_hover: require('@/assets/audio/sfx/button_hover.wav'),
    portal_select: require('@/assets/audio/sfx/portal_select.wav'),
    portal_enter: require('@/assets/audio/sfx/portal_enter.wav'),
    level_complete: require('@/assets/audio/sfx/level_complete.wav'),
    achievement_unlock: require('@/assets/audio/sfx/achievement_unlock.wav'),
    coin_collect: require('@/assets/audio/sfx/coin_collect.wav'),
    star_earn: require('@/assets/audio/sfx/star_earn.wav'),
    error: require('@/assets/audio/sfx/error.wav'),
    success: require('@/assets/audio/sfx/success.wav'),
    companion_meet: require('@/assets/audio/sfx/companion_meet.wav'),
    checkpoint_pass: require('@/assets/audio/sfx/checkpoint_pass.wav'),
    checkpoint_fail: require('@/assets/audio/sfx/checkpoint_fail.wav'),
  };

  /**
   * Initialize audio service
   * Must be called once at app startup
   */
  async initialize(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      console.log('Audio service initialized');
    } catch (error) {
      console.error('Error initializing audio service:', error);
    }
  }

  /**
   * Play background music
   * Auto-loops and fades in
   */
  async playMusic(track: MusicTrack, fadeIn = true): Promise<void> {
    if (!this.isMusicEnabled) return;

    try {
      // If same track is playing, do nothing
      if (this.currentTrack === track && this.musicSound) {
        const status = await this.musicSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          return;
        }
      }

      // Stop current music
      await this.stopMusic(true);

      // Load new track
      const { sound } = await Audio.Sound.createAsync(
        this.musicTracks[track],
        {
          isLooping: true,
          volume: fadeIn ? 0 : this.volumes.music * this.volumes.master,
        }
      );

      this.musicSound = sound;
      this.currentTrack = track;

      // Play
      await sound.playAsync();

      // Fade in
      if (fadeIn) {
        await this.fadeMusic('in', 1000);
      }

      console.log(`Playing music: ${track}`);
    } catch (error) {
      console.error(`Error playing music ${track}:`, error);
    }
  }

  /**
   * Stop background music
   */
  async stopMusic(fadeOut = true): Promise<void> {
    if (!this.musicSound) return;

    try {
      if (fadeOut) {
        await this.fadeMusic('out', 500);
      }

      await this.musicSound.stopAsync();
      await this.musicSound.unloadAsync();
      this.musicSound = null;
      this.currentTrack = null;

      console.log('Music stopped');
    } catch (error) {
      console.error('Error stopping music:', error);
    }
  }

  /**
   * Fade music in or out
   */
  private async fadeMusic(direction: 'in' | 'out', duration: number): Promise<void> {
    if (!this.musicSound || this.isMusicFading) return;

    this.isMusicFading = true;
    const targetVolume = this.volumes.music * this.volumes.master;
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;

    try {
      for (let i = 0; i <= steps; i++) {
        const volume = direction === 'in'
          ? volumeStep * i
          : targetVolume - (volumeStep * i);

        await this.musicSound.setVolumeAsync(volume);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
    } catch (error) {
      console.error('Error fading music:', error);
    } finally {
      this.isMusicFading = false;
    }
  }

  /**
   * Play sound effect
   * One-shot, no looping
   */
  async playSFX(type: SFXType): Promise<void> {
    if (!this.isSFXEnabled) return;

    try {
      // Check cache
      let sound = this.sfxCache.get(type);

      if (!sound) {
        // Load and cache
        const { sound: newSound } = await Audio.Sound.createAsync(
          this.sfxPaths[type],
          {
            volume: this.volumes.sfx * this.volumes.master,
          }
        );
        sound = newSound;
        this.sfxCache.set(type, sound);
      } else {
        // Rewind if already loaded
        await sound.setPositionAsync(0);
        await sound.setVolumeAsync(this.volumes.sfx * this.volumes.master);
      }

      await sound.playAsync();
    } catch (error) {
      console.error(`Error playing SFX ${type}:`, error);
    }
  }

  /**
   * Play narration audio
   * For storytelling and educational content
   */
  async playNarration(audioPath: any, onComplete?: () => void): Promise<void> {
    if (!this.isNarrationEnabled) return;

    try {
      // Stop any current narration
      await this.stopNarration();

      // Load narration
      const { sound } = await Audio.Sound.createAsync(
        audioPath,
        {
          volume: this.volumes.narration * this.volumes.master,
        }
      );

      this.narrationSound = sound;

      // Set playback callback
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          this.stopNarration();
          if (onComplete) onComplete();
        }
      });

      await sound.playAsync();

      console.log('Playing narration');
    } catch (error) {
      console.error('Error playing narration:', error);
    }
  }

  /**
   * Stop narration
   */
  async stopNarration(): Promise<void> {
    if (!this.narrationSound) return;

    try {
      await this.narrationSound.stopAsync();
      await this.narrationSound.unloadAsync();
      this.narrationSound = null;
    } catch (error) {
      console.error('Error stopping narration:', error);
    }
  }

  /**
   * Pause narration
   */
  async pauseNarration(): Promise<void> {
    if (!this.narrationSound) return;

    try {
      await this.narrationSound.pauseAsync();
    } catch (error) {
      console.error('Error pausing narration:', error);
    }
  }

  /**
   * Resume narration
   */
  async resumeNarration(): Promise<void> {
    if (!this.narrationSound) return;

    try {
      await this.narrationSound.playAsync();
    } catch (error) {
      console.error('Error resuming narration:', error);
    }
  }

  /**
   * Set volume for a category
   */
  async setVolume(category: AudioCategory | 'master', volume: number): Promise<void> {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.volumes[category] = clampedVolume;

    // Update current sounds
    if (category === 'music' || category === 'master') {
      if (this.musicSound) {
        await this.musicSound.setVolumeAsync(this.volumes.music * this.volumes.master);
      }
    }

    if (category === 'narration' || category === 'master') {
      if (this.narrationSound) {
        await this.narrationSound.setVolumeAsync(this.volumes.narration * this.volumes.master);
      }
    }

    console.log(`Volume updated: ${category} = ${clampedVolume}`);
  }

  /**
   * Get current volume
   */
  getVolume(category: AudioCategory | 'master'): number {
    return this.volumes[category];
  }

  /**
   * Toggle music on/off
   */
  async toggleMusic(enabled: boolean): Promise<void> {
    this.isMusicEnabled = enabled;

    if (!enabled && this.musicSound) {
      await this.stopMusic(true);
    }
  }

  /**
   * Toggle SFX on/off
   */
  toggleSFX(enabled: boolean): void {
    this.isSFXEnabled = enabled;
  }

  /**
   * Toggle narration on/off
   */
  async toggleNarration(enabled: boolean): Promise<void> {
    this.isNarrationEnabled = enabled;

    if (!enabled && this.narrationSound) {
      await this.stopNarration();
    }
  }

  /**
   * Get audio enabled states
   */
  getAudioStates() {
    return {
      music: this.isMusicEnabled,
      sfx: this.isSFXEnabled,
      narration: this.isNarrationEnabled,
    };
  }

  /**
   * Cleanup all audio resources
   * Call on app exit or when needed
   */
  async cleanup(): Promise<void> {
    try {
      // Stop music
      await this.stopMusic(false);

      // Unload SFX cache
      for (const [type, sound] of this.sfxCache.entries()) {
        await sound.unloadAsync();
      }
      this.sfxCache.clear();

      // Stop narration
      await this.stopNarration();

      console.log('Audio service cleaned up');
    } catch (error) {
      console.error('Error cleaning up audio service:', error);
    }
  }
}

// Singleton instance
export const audioService = new AudioService();
