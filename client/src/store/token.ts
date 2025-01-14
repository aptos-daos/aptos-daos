import { create } from "zustand";

interface TokenStore {
  tokenList: Token[];
  setTokenList: (tokens: Token[]) => void;
  activeToken?: Token;
  setActiveToken: (token: Token) => void;
  balance?: {[key: string]: string};
  setBalance: (balance: {[key: string]: string}) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokenList: [],
  activeToken: undefined,
  setTokenList: (tokens) => set({ tokenList: tokens }),
  setActiveToken: (token) => set({ activeToken: token }),
  balance: undefined,
  setBalance: (balance) => set({ balance }),
}));
