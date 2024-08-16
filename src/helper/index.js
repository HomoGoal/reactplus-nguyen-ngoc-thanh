export const handleGetMinute = (timer) => {
  if (timer) {
    return timer / 10 + "s";
  } else {
    return 0;
  }
};

export const handleGetPosition = (size) => {
  if (size) {
    return Math.random() * (size - 52);
  } else {
    return 0;
  }
};