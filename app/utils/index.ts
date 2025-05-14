export const secondsToMMSS = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  // Pad with zeros to ensure 2 digits
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
  return `${paddedMinutes}:${paddedSeconds}`;
}