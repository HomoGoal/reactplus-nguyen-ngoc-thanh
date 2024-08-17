export const handleGetPosition = (size) => {
  if (size) {
    return Math.random() * (size - 52);
  } else {
    return 0;
  }
};