import { create } from "zustand";
interface User {
  id: string;
  name: string;
  token?: string;
}
interface UserStoreI {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreI>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
