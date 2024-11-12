export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds <= 9 ? "0" : ""}${Math.round(
    remainingSeconds,
  )}`;
};
