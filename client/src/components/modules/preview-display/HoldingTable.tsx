import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/utils/formatters";

interface Holding {
  name: string;
  quantity: number;
  value: number;
  change: number;
}

interface Props {
  fundId: string;
}

const HoldingTable: React.FC<Props> = ({ fundId }) => {
  // TODO: Implement Holdings API
  const columns: Column<Holding>[] = [
    {
      id: "name",
      header: "Name",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: (row) => formatNumber(row.quantity),
      className: "text-right",
    },
    {
      id: "value",
      header: "Value",
      cell: (row) => formatCurrency(row.value),
      className: "text-right",
    },
    {
      id: "change",
      header: "Change",
      cell: (row) => (
        <span className={row.change >= 0 ? "text-green-600" : "text-red-600"}>
          {formatPercentage(row.change)}
        </span>
      ),
      className: "text-right",
    },
  ];
  return <DataTable<Holding> data={[]} columns={columns} />;
};

export default HoldingTable;
