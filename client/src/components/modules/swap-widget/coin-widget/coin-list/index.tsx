import React, { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash";
import CoinListCard from "./CoinListCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTokenStore } from "@/store/token";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  onClose: () => void;
}

// Cache interface
interface SearchCache {
  [key: string]: Token[];
}

const CoinList = ({ onClose }: Props) => {
  const { tokenList, setActiveToken } = useTokenStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokenList);
  const [searchCache, setSearchCache] = useState<SearchCache>({});

  // Memoize the search function to prevent recreation on every render
  const searchTokens = useMemo(
    () =>
      _.debounce((query: string, tokens: Token[]) => {
        if (query === "") {
          setFilteredTokens(tokens);
          return;
        }

        // Check if we have cached results for this query
        if (searchCache[query]) {
          setFilteredTokens(searchCache[query]);
          return;
        }

        const searchLower = query.toLowerCase();
        const filtered = tokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchLower) ||
            token.symbol.toLowerCase().includes(searchLower)
        );

        // Cache the results
        setSearchCache((prevCache) => ({
          ...prevCache,
          [query]: filtered,
        }));

        setFilteredTokens(filtered);
      }, 300),
    [searchCache]
  );

  // Clear cache when token list changes
  useEffect(() => {
    setSearchCache({});
    setFilteredTokens(tokenList);
  }, [tokenList]);

  // Handle search query changes
  useEffect(() => {
    searchTokens(searchQuery, tokenList);
    
    // Cleanup function for debounce
    return () => {
      searchTokens.cancel();
    };
  }, [searchQuery, tokenList, searchTokens]);

  // Memoize the skeleton renderer
  const renderSkeletons = useCallback(
    () => (
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
    ),
    []
  );

  // Memoize token list rendering for better performance
  const renderedTokenList = useMemo(
    () => (
      <>
        {filteredTokens.map((token, index) => (
          <CoinListCard
            key={`${token.symbol}-${index}`}
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
    ),
    [filteredTokens, searchQuery, tokenList, setActiveToken, onClose]
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
        {tokenList.length === 0 ? renderSkeletons() : renderedTokenList}
      </div>
    </div>
  );
};

export default CoinList;