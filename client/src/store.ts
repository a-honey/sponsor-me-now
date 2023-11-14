import { create } from 'zustand';

interface LoginStore {
  loginId: number | null;
  loginUsername: string | null;
  token: string | null;
  setLoginId: (id: number) => void;
  setLoginUsername: (username: string) => void;
  setToken: (token: string) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  loginId: null,
  loginUsername: null,
  token: null,
  setLoginId: (id: number) => set({ loginId: id }),
  setLoginUsername: (username: string) => set({ loginUsername: username }),
  setToken: (token: string) => set({ token }),
}));
