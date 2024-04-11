export const decodeId = (encoded: string): number => {
  const originalId = Number(encoded?.split(";")[0]);

  return originalId;
};
