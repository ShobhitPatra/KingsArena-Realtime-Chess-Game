import { create } from "zustand";
interface User {
  id: string;
  name: string;
  token?: string;
  isGuest: boolean;
}
interface UserStoreI {
  user: User | null;
  setUser: (user: User | null
    
  ) => void;
}

export const useUserStore = create<UserStoreI>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
