/**
 * Formats time in seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates percentage from current time and duration
 * @param currentTime - Current playback time
 * @param duration - Total duration
 * @returns Percentage value
 */
export const calculatePercentage = (
  currentTime: number,
  duration: number
): number => {
  if (duration <= 0) return 0;
  return (currentTime / duration) * 100;
};

/**
 * Calculates actual time from percentage and duration
 * @param percentage - Percentage value (0-100)
 * @param duration - Total duration
 * @returns Actual time in seconds
 */
export const calculateTimeFromPercentage = (
  percentage: number,
  duration: number
): number => {
  return (percentage / 100) * duration;
};
