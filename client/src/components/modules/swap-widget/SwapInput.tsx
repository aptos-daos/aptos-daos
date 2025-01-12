import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CoinList from "./coin-widget/coin-list";
import { useTokenStore } from "@/store/token";

interface SwapInputProps {
  label: string;
  disabled?: boolean;
  value?: number | null;
  onChange?: (value: number) => void;
}

const SwapInput: React.FC<SwapInputProps> = ({ label, disabled, value, onChange }) => {
  const { activeToken } = useTokenStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="select-none">{label}</span>
          <span className="flex items-center gap-1">
            <span className="text-gray-400">Wallet Balance:</span>
            <span>APT</span>
          </span>
        </div>
        <div className="relative">
          <Input
            type="number"
            placeholder="0.0"
            value={value || ""}
            onChange={handleChange}
            className="pr-16"
          />
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger
              className="text-xs absolute right-2 top-[18px] -translate-y-1/2 bg-gray-100 px-2 py-1 rounded"
            >
              {disabled ? "APT" : activeToken?.symbol || "APT"}
            </DrawerTrigger>
            <DrawerTitle hidden></DrawerTitle>
            <DrawerContent>
              <CoinList onClose={handleClose}/>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default SwapInput;
