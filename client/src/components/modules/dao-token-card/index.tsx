import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { formatDate } from "@/utils/formatters";

interface DAOTokenProps {
  tokenName: string;
  adminAddress: string;
  fundType: string;
  creatorCarryFee: number;
  pfundToken: string;
  daoExpiration: Date;
  fundraiseExpiration: Date;
  progressAmount: number;
  progressTotal: number;
  tokenSymbol?: string;
}

const DAOTokenCard = ({
  tokenName,
  adminAddress,
  fundType,
  creatorCarryFee,
  pfundToken,
  daoExpiration,
  fundraiseExpiration,
  progressAmount,
  progressTotal,
  tokenSymbol = "APT",
}: DAOTokenProps) => {
  const formatAddress = (address: string) => {
    if (address.length < 12) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{tokenName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Admin address</span>
            <div className="flex items-center gap-2">
              <span>{formatAddress(adminAddress)}</span>
              <Copy className="h-4 w-4 cursor-pointer hover:text-gray-600" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fund type</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm">
              {fundType}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Creator Carry fee</span>
            <span>{creatorCarryFee}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">PFUND token</span>
            <div className="flex items-center gap-2">
              <span>{formatAddress(pfundToken)}</span>
              <Copy className="h-4 w-4 cursor-pointer hover:text-gray-600" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">DAO expiration</span>
            <span>{formatDate(daoExpiration)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fundraise expiration</span>
            <span>{formatDate(fundraiseExpiration)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Progress</span>
            <span>
              {progressAmount} {tokenSymbol} / {progressTotal} {tokenSymbol}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (progressAmount / progressTotal) * 100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DAOTokenCard;
