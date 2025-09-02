import { useState, useEffect, useRef } from 'react';
import {
  calculatePercentage,
  calculateTimeFromPercentage,
} from '@/utils/audio';
import { setupGlobalDragListeners, getCurrentSliderValue } from '@/utils/dom';

interface UseSeekBarProps {
  currentSeek: number;
  duration: number;
  onSeek: (time: number) => void;
  onDraggingChange: (isDragging: boolean) => void;
}

export const useSeekBar = ({
  currentSeek,
  duration,
  onSeek,
  onDraggingChange,
}: UseSeekBarProps) => {
  const [localSeekValue, setLocalSeekValue] = useState(0);
  const isDraggingRef = useRef(false);

  // Update local seek value when not dragging
  useEffect(() => {
    if (!isDraggingRef.current && duration > 0) {
      const percentage = calculatePercentage(currentSeek, duration);
      setLocalSeekValue(percentage);
    }
  }, [currentSeek, duration]);

  useEffect(() => {
    const cleanup = setupGlobalDragListeners(() => {
      if (isDraggingRef.current) {
        const percentage = getCurrentSliderValue('input[type="range"]');
        if (percentage !== null && duration > 0) {
          const actualTime = calculateTimeFromPercentage(percentage, duration);
          onSeek(actualTime);
        }

        isDraggingRef.current = false;
        onDraggingChange(false);
      }
    });

    return cleanup;
  }, [duration, onSeek, onDraggingChange]);

  const handleSeekChange = (percentage: number) => {
    setLocalSeekValue(percentage);
  };

  const handleSeekStart = () => {
    isDraggingRef.current = true;
    onDraggingChange(true);
  };

  const handleSeekEnd = () => {
    if (duration > 0) {
      const actualTime = calculateTimeFromPercentage(localSeekValue, duration);
      onSeek(actualTime);
    }

    isDraggingRef.current = false;
    onDraggingChange(false);
  };

  return {
    localSeekValue,
    handleSeekChange,
    handleSeekStart,
    handleSeekEnd,
  };
};
