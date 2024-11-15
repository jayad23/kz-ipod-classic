export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const secs = remainingSeconds;
  return `${minutes}:${remainingSeconds <= 9 ? "0" : ""}${secs}`;
};
