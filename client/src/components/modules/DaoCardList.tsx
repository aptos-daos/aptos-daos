import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "../molecules/DaoCard";
import { Skeleton } from "../ui/skeleton";

interface Props {
  title: string;
  daos: DaoData[];
  loading?: boolean;
}

const DaoCardList = ({ title, daos, loading }: Props) => {
  return (
    <section>
      <h1>{title}</h1>
      <div className="flex flex-row gap-4">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="h-48 w-full mb-4" />)
          : daos.map((fund: DaoData) => <DaoCard key={fund.id} {...fund} />)}
      </div>
    </section>
  );
};

export default DaoCardList;
