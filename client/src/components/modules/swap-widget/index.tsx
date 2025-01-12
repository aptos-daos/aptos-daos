"use client";

import React, { useState } from "react";
import { TransitionPanel } from "@/components/ui/transition-panel";
import { Button } from "@/components/ui/button";
import FundWidget from "./fund-widget";
import CoinWidget from "./coin-widget";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SwapWidget = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ITEMS = [
    {
      title: "Commit",
      content: CoinWidget,
    },
    {
      title: "Withdraw",
      content: FundWidget,
    },
  ];
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row space-x-2 p-2">
        {ITEMS.map((item, index) => (
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-none border-b-2",
              activeIndex === index
                ? "border-red-500 text-red-500"
                : "border-transparent text-muted-foreground hover:text-current rounded-t"
            )}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </Button>
        ))}
      </CardHeader>
      <CardContent className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
          className="p-4"
        >
          {ITEMS.map((item, index) => (
            <item.content key={index} />
          ))}
        </TransitionPanel>
      </CardContent>
    </Card>
  );
};

export default SwapWidget;
