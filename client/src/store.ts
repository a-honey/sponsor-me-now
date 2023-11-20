import { create } from 'zustand';

interface LoginStore {
  loginId: number | null;
  loginUsername: string | null;
  loginEmail: string | null;
  token: string | null;
  setLoginId: (id: number | null) => void;
  setLoginUsername: (username: string | null) => void;
  setLoginEmail: (email: string | null) => void;
  setToken: (token: string | null) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  loginId: null,
  loginUsername: null,
  loginEmail: null,
  token: null,
  setLoginId: (id: number | null) => set({ loginId: id }),
  setLoginUsername: (username: string | null) =>
    set({ loginUsername: username }),
  setLoginEmail: (email: string | null) => set({ loginEmail: email }),
  setToken: (token: string | null) => set({ token }),
}));
