import { create } from "zustand";

interface TokenStore {
  tokenList: Token[];
  setTokenList: (tokens: Token[]) => void;
  activeToken?: Token;
  setActiveToken: (token: Token) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokenList: [],
  activeToken: undefined,
  setTokenList: (tokens) => set({ tokenList: tokens }),
  setActiveToken: (token) => set({ activeToken: token }),
}));
