import { create } from 'zustand';
import { Howl } from 'howler';
import type { SongStore, Track } from '@/types/audio';
import { AUDIO_CONFIG } from '@/utils/constants';

export const useSongStore = create<SongStore>((set, get) => ({
  currentTrack: null,
  sound: null,
  currentSeek: 0,
  currentRate: AUDIO_CONFIG.DEFAULT_RATE,
  currentVolume: AUDIO_CONFIG.DEFAULT_VOLUME,
  isPlaying: false,
  isLooping: false,
  duration: 0,
  isDragging: false,
  isLoading: false,
  error: null,

  setDragging: (dragging: boolean) => {
    set({ isDragging: dragging });
  },

  play: (track?: Track) => {
    const state = get();
    const trackToPlay = track || state.currentTrack;

    if (!trackToPlay) {
      console.warn('No track provided to play');
      return;
    }

    if (!state.sound || state.currentTrack?.id !== trackToPlay.id) {
      if (state.sound) {
        state.sound.stop();
        state.sound.unload();
      }

      set({ isLoading: true, error: null });

      const newSound = new Howl({
        src: [trackToPlay.src],
        html5: true,
        volume: state.currentVolume,
        rate: state.currentRate,
        format: ['mp3'],
        onload: () => {
          console.log('Track loaded:', trackToPlay.name);
          set({
            duration: newSound.duration(),
            isLoading: false,
            error: null,
          });
        },
        onloaderror: (error) => {
          console.error('Failed to load track:', trackToPlay.name, error);
          set({
            isLoading: false,
            error: `Failed to load: ${trackToPlay.name}`,
          });
        },
        onplay: () => {
          console.log('Playing:', trackToPlay.name);
          set({ isPlaying: true, isLoading: false });

          const updatePosition = () => {
            const currentState = get();
            if (currentState.isPlaying && !currentState.isDragging) {
              const currentPos = newSound.seek();
              if (typeof currentPos === 'number') {
                set({ currentSeek: currentPos });
              }
            }
            if (currentState.isPlaying) {
              requestAnimationFrame(updatePosition);
            }
          };
          requestAnimationFrame(updatePosition);
        },
        onplayerror: (error) => {
          console.error('Playback error:', error);
          set({
            isPlaying: false,
            isLoading: false,
            error: `Playback failed: ${trackToPlay.name}`,
          });
        },
        onpause: () => {
          set({ isPlaying: false });
        },
        onend: () => {
          set({ isPlaying: false, currentSeek: 0 });
          console.log('Track finished:', trackToPlay.name);
        },
      });

      set({
        sound: newSound,
        currentTrack: trackToPlay,
        currentSeek: 0,
      });

      newSound.play();
    } else {
      state.sound.play();
    }
  },

  toggleLoop: () => {
    const state = get();
    const newLoopState = !state.isLooping;

    if (state.sound) {
      state.sound.loop(newLoopState);
    }

    set({ isLooping: newLoopState });
  },

  seek: (newSeek: number) => {
    const s = get().sound;
    if (s) {
      s.seek(newSeek);
      set({ currentSeek: newSeek });
    }
  },

  pause: () => {
    const s = get().sound;
    if (s) {
      s.pause();
    }
  },

  stop: () => {
    const s = get().sound;
    if (s) {
      s.stop();
      set({ currentSeek: 0 });
    }
  },

  rate: (newRate: number) => {
    const s = get().sound;
    if (s) s.rate(newRate);
    set({ currentRate: newRate });
  },

  volume: (newVolume: number) => {
    const s = get().sound;
    if (s) s.volume(newVolume);
    set({ currentVolume: newVolume });
  },
}));
