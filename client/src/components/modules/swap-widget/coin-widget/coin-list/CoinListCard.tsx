import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CryptoTokenProps {
  token: Token;
  onFavoriteClick?: (tokenAddress: string) => void;
  onCopyAddress?: (tokenAddress: string) => void;
  onExternalLinkClick?: (websiteUrl: string) => void;
  isFavorited?: boolean;
  className?: string;
  onClick?: () => void;
}

const CoinListCard = ({
  token,
  onFavoriteClick = () => {},
  onCopyAddress = () => {},
  onExternalLinkClick = () => {},
  isFavorited = false,
  className = "",
  onClick = () => {},
}: CryptoTokenProps) => {
  const tokenPrice = parseFloat(token.usdPrice || "0");
  const formattedUsdPrice = tokenPrice.toFixed(2);

  const handleCopyClick = () => {
    onCopyAddress(token.tokenAddress);
  };

  const handleFavoriteClick = () => {
    onFavoriteClick(token.tokenAddress);
  };

  const handleExternalLinkClick = () => {
    onExternalLinkClick(token.websiteUrl);
  };

  if (token.isBanned) {
    return null;
  }

  return (
    <Card className={className} onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={`${
                isFavorited ? "text-yellow-400" : "text-zinc-400"
              } hover:text-white p-0`}
              onClick={handleFavoriteClick}
            >
              <Star className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center">
                {token.logoUrl ? (
                  <Image
                    src={token.logoUrl}
                    alt={token.name}
                    className="w-full h-full object-cover"
                    height={32}
                    width={32}
                  />
                ) : (
                  <span className="text-lg font-semibold text-white">
                    {token.symbol.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{token.symbol}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white p-0 h-4 w-4"
                    onClick={handleCopyClick}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {token.websiteUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white p-0 h-4 w-4"
                      onClick={handleExternalLinkClick}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  {token.panoraUI && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  )}
                </div>
                <span className="text-sm text-zinc-400">{token.name}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-medium">{token.panoraSymbol}</span>
            <span className="text-sm text-zinc-400">~${formattedUsdPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinListCard;