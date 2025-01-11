import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaoData } from "@/validation/dao.validation";
import { formatCurrency } from "@/utils/formatters";
import HoldingTable from "./HoldingTable";

interface Props extends DaoData {
  portfolioSize: number;
  portfolioPercentage: number;
}

const PreviewDisplay = ({
  id,
  title,
  portfolioSize,
  portfolioPercentage,
}: Props) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              Portfolio Size: {formatCurrency(portfolioSize)}
            </span>
            <span className="text-lg text-gray-600">
              ({portfolioPercentage}%)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HoldingTable fundId={id} />
      </CardContent>
    </Card>
  );
};

export default PreviewDisplay;
