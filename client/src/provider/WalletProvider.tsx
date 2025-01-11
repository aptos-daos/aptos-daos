"use client";

import React, { FC, ReactNode, createContext, useRef } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { Network } from "@aptos-labs/ts-sdk";

import { useAutoConnectStore } from "@/store/wallet";
import { useToast } from "@/hooks/use-toast";

const StoreContext = createContext(null);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnectStore();
  const storeRef = useRef(null);
  const {toast} = useToast();
  const wallets = [
    new PetraWallet(),
    new MartianWallet(),
    new PontemWallet(),
    new TrustWallet(),
  ];

  return (
    <StoreContext.Provider value={storeRef.current}>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={autoConnect}
        dappConfig={{
          network: Network.TESTNET,
          aptosConnectDappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5",
          mizuwallet: {
            manifestURL:
              "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
          },
        }}
        onError={(error) => {
          console.error(error);

          toast({
            title: "Wallet Error",
            description: error.message || "Unknown wallet error",
            variant: "destructive",
          })
        }}
      >
        {children}
      </AptosWalletAdapterProvider>
    </StoreContext.Provider>
  );
};

// Hook for easy access to auto-connect state
export const useAutoConnect = () => {
  const { autoConnect, setAutoConnect } = useAutoConnectStore();
  return { autoConnect, setAutoConnect };
};
