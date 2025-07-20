/**
 * Sets up global event listeners for drag operations
 * @param onEnd - Callback function to execute when drag ends
 * @returns Cleanup function to remove event listeners
 */
export const setupGlobalDragListeners = (onEnd: () => void) => {
  const handleGlobalEnd = () => onEnd();

  document.addEventListener('mouseup', handleGlobalEnd);
  document.addEventListener('touchend', handleGlobalEnd);
  document.addEventListener('mouseleave', handleGlobalEnd);

  return () => {
    document.removeEventListener('mouseup', handleGlobalEnd);
    document.removeEventListener('touchend', handleGlobalEnd);
    document.removeEventListener('mouseleave', handleGlobalEnd);
  };
};

/**
 * Gets the current seek value from a range slider
 * @param selector - CSS selector for the range input
 * @returns Current slider value as number or null if not found
 */
export const getCurrentSliderValue = (selector: string): number | null => {
  const slider = document.querySelector(selector) as HTMLInputElement;
  return slider ? parseFloat(slider.value) : null;
};
