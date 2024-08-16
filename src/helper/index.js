export const handleGetMinute = (timer) => {
  return timer / 10 + 's';
};

export const handleGetPosition = (size) => {
  return Math.random() * (size - 52);
};
