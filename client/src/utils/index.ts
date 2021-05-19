export const generateRandomEndpoint = (): string => {
  const timestamp = new Date().getTime();
  return `${timestamp}-${Math.random().toString().slice(2)}`;
};
