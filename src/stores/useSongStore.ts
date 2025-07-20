import { create } from 'zustand';
import { Howl } from 'howler';
import type { SongStore } from '@/types/audio';
import { AUDIO_CONFIG, DEMO_TRACK } from '@/utils/constants';

export const useSongStore = create<SongStore>((set, get) => ({
  sound: null,
  currentSeek: 0,
  currentRate: AUDIO_CONFIG.DEFAULT_RATE,
  currentVolume: AUDIO_CONFIG.DEFAULT_VOLUME,
  isPlaying: false,
  duration: 0,
  isDragging: false,

  setDragging: (dragging: boolean) => {
    set({ isDragging: dragging });
  },

  play: () => {
    const currentSound = get().sound;

    if (!currentSound) {
      const newSound = new Howl({
        src: [DEMO_TRACK.src],
        html5: true,
        volume: get().currentVolume,
        rate: get().currentRate,
        onload: () => {
          set({ duration: newSound.duration() });
        },
        onplay: () => {
          set({ isPlaying: true });

          const updatePosition = () => {
            const state = get();
            if (state.isPlaying && !state.isDragging) {
              const currentPos = newSound.seek();
              if (typeof currentPos === 'number') {
                set({ currentSeek: currentPos });
              }
            }
            if (state.isPlaying) {
              requestAnimationFrame(updatePosition);
            }
          };
          requestAnimationFrame(updatePosition);
        },
        onpause: () => {
          set({ isPlaying: false });
        },
        onend: () => {
          set({ isPlaying: false, currentSeek: 0 });
          console.log('Finished!');
        },
      });
      set({ sound: newSound });
      newSound.play();
    } else {
      currentSound.play();
    }
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
