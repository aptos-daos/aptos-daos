import React, { useEffect, useState } from "react";
import CoinListCard from "./CoinListCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTokenStore } from "@/store/token";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  onClose: () => void;
}

const CoinList = ({ onClose }: Props) => {
  const { tokenList, setActiveToken } = useTokenStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);

  useEffect(() => {
    setFilteredTokens(tokenList);
  }, [tokenList]);

  useEffect(() => {
    if (searchQuery === "" || tokenList.length === 0) {
      return;
    }
    const filtered = tokenList.filter((token) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        token.name.toLowerCase().includes(searchLower) ||
        token.symbol.toLowerCase().includes(searchLower)
      );
    });
    setFilteredTokens(filtered);
  }, [searchQuery, tokenList]);

  const renderSkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="space-y-4 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="text"
          placeholder="Search by name, symbol, or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="h-96 overflow-y-auto space-y-2">
        {tokenList.length === 0 ? (
          renderSkeletons()
        ) : (
          <>
            {filteredTokens.map((token, index) => (
              <CoinListCard
                key={index}
                token={token}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setActiveToken(tokenList[index]);
                  onClose();
                }}
              />
            ))}
            {filteredTokens.length === 0 && searchQuery && (
              <div className="text-center py-4 text-zinc-500">
                {`No tokens found matching "{${searchQuery}}"`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinList;
