"use client";

import { useDao } from "@/hooks/use-dao";
import React from "react";
import { isAfter, isBefore, parseISO } from "date-fns";
import { DaoData } from "@/validation/dao.validation";
import DaoCardList from "@/components/modules/DaoCardList";
import { WalletSelector } from "@/components/WalletSelector";

const Home: React.FC = () => {
  const { daos, loading, error } = useDao();
  const currentDate = new Date();

  if (error) {
    return <div>Error loading data</div>;
  }

  const featuredFunds = daos.filter((fund: DaoData) => {
    return (
      isAfter(currentDate, fund.fundingStarts) &&
      isBefore(currentDate, parseISO(String(fund.fundingEnds)))
    );
  });

  const upcomingFunds = daos.filter((fund: DaoData) => {
    return isAfter(fund.fundingStarts, currentDate);
  });

  return (
    <>
      <div className="w-fit">
        <WalletSelector />
      </div>
      <main>
        <DaoCardList
          title="Featured Funds"
          daos={featuredFunds}
          loading={loading}
        />
        <DaoCardList
          title="Upcoming Funds"
          daos={upcomingFunds}
          loading={loading}
        />
      </main>
    </>
  );
};

export default Home;
