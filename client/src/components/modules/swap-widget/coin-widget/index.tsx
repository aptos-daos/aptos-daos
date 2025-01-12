"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpDown } from "lucide-react";
import SwapInput from "../SwapInput";
import { useTokenStore } from "@/store/token";

interface SwapProps {
  onSwap?: (fromAmount: number, toAmount: number) => void;
  loading?: boolean;
}

const CoinWidget = ({ onSwap, loading = false }: SwapProps) => {
  const { tokenList } = useTokenStore();
  const [activeToken, setActiveToken] = useState<Token>(tokenList[0]);
  const [activeAmount, setActiveAmount] = useState<number>();
  const predefinedAmounts = ["0.5", "1", "2", "5"];

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
