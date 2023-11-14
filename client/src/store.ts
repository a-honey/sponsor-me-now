import { create } from 'zustand';

interface LoginStore {
  loginId: number | null;
  loginUsername: string | null;
  setLoginId: (id: number) => void;
  setLoginUsername: (username: string) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  loginId: null,
  loginUsername: null,
  setLoginId: (id: number) => set({ loginId: id }),
  setLoginUsername: (username: string) => set({ loginUsername: username }),
}));
