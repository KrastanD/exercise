import storage from '../helpers/storage';
import { PersistStorage, StateStorage } from 'zustand/middleware';

const zustandStorage: PersistStorage<StateStorage> = {
  getItem: async (name: string) => {
    const curr = storage.getString(name);
    return curr ? JSON.parse(curr) : null;
  },
  setItem: (name, value) => {
    return storage.set(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    return storage.delete(name);
  },
};

export default zustandStorage;
