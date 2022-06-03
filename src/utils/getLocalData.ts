export const getLocalData = (key: string) => {
  const localData = localStorage.getItem(key);
  if (localData) {
    return JSON.parse(localData);
  }
  return [];
};
