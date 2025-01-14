"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpDown } from "lucide-react";
import SwapInput from "../SwapInput";
import { useTokenStore } from "@/store/token";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { fetchBalance } from "@/components/WalletSelector/wallet";

interface SwapProps {
  onSwap?: (fromAmount: number, toAmount: number) => void;
  loading?: boolean;
}

const CoinWidget = ({ onSwap, loading = false }: SwapProps) => {
  const {account}  = useWallet();
  const { tokenList, balance, setBalance } = useTokenStore();
  const [activeToken, setActiveToken] = useState<Token>(tokenList[0]);
  const [activeAmount, setActiveAmount] = useState<number>();
  const predefinedAmounts = ["0.5", "1", "2", "5"];
  

  // TODO: Fetch balance
  // useEffect(() => {
  //   const loadBalance = async () => {
  //     if (account?.address && activeToken.tokenAddress) {
  //       try {
  //         const newBalance = await fetchBalance(account.address, activeToken.tokenAddress);
  //         setBalance(prev => ({
  //           ...prev,
  //           [activeToken.tokenAddress]: newBalance
  //         }));
  //       } catch (error) {
  //         console.error('Error fetching balance:', error);
  //       }
  //     }
  //   };

  //   loadBalance();
  // }, [account?.address, activeToken.tokenAddress]);

  function handleChange(value: number) {
    setActiveAmount(value);
  }

  return (
    <div className="space-y-6">
      {/* Predefined Amounts */}
      <div className="grid grid-cols-4 gap-2">
        {predefinedAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className="w-full"
            onClick={() => setActiveAmount(Number(amount))}
          >
            {`${amount} APT`}
          </Button>
        ))}
      </div>

      {/* TODO: From Input */}
      <SwapInput
        label="From"
        value={activeAmount}
        onChange={handleChange}
        disabled
      />

      {/* Swap Icon */}
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-2">
          <ArrowUpDown className="h-6 w-6 text-white" />
        </div>
        <div className="border-t border-gray-200" />
      </div>

      {/* To Input */}
      <SwapInput
        label="To"
        value={activeAmount && Number(activeToken.usdPrice) * activeAmount}
      />

      {/* Price Impact & Fees */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Price Impact</span>
          <span>1.07%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fees</span>
          <span>0.001 APT</span>
        </div>
      </div>

      {/* Swap Button */}
      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "SWAP for the Sake of GOD"
        )}
      </Button>
    </div>
  );
};

export default CoinWidget;
