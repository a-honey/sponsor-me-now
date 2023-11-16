import { create } from 'zustand';

interface LoginStore {
  loginId: number | null;
  loginUsername: string | null;
  token: string | null;
  setLoginId: (id: number | null) => void;
  setLoginUsername: (username: string | null) => void;
  setToken: (token: string | null) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  loginId: null,
  loginUsername: null,
  token: null,
  setLoginId: (id: number | null) => set({ loginId: id }),
  setLoginUsername: (username: string | null) =>
    set({ loginUsername: username }),
  setToken: (token: string | null) => set({ token }),
}));
