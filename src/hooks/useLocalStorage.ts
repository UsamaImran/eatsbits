type LocalStorageKeys =
  | 'SHOULD_DISPLAY_WELCOME_MESSAGE'
  | 'RECENT_VISITED_RESTAURANT';

export const useLocalStorage = <T extends LocalStorageKeys>(key: T) => {
  const storage = localStorage;
  const item = storage.getItem(key);
  const setItem = (value: string) => storage.setItem(key, value);
  const clearStorage = () => storage.clear();
  const removeItem = () => storage.removeItem(key);
  return { item, setItem, clearStorage, removeItem };
};
