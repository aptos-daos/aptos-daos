"use client";

import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import useInvite from "@/hooks/use-invite";

interface Invite {
  name: string;
  code: string;
  user: string;
  expiresAt: string;
}

const Dashboard = () => {
  const { createInviteCode } = useInvite(true);
  const handleCopyClick = async () => {
    const code = await createInviteCode();
    await navigator.clipboard.writeText(code);
  };
  const columns: Column<Invite>[] = [
    {
      id: "code",
      header: "Code",
      cell: (row) => <span>{row.code}</span>,
    },
    {
      id: "user",
      header: "User",
      cell: (row) => row.user,
    },
    {
      id: "expiresAt",
      header: "Expires At",
      cell: (row) => row.expiresAt,
    },
  ];

  return (
    <main className="md:max-w-screen-md mx-auto space-y-2">
      <div className="flex justify-end">
        <Button onClick={handleCopyClick}>
          <Clipboard />
          Generate A New Code
        </Button>
      </div>
      <DataTable<Invite> data={[]} columns={columns} />
    </main>
  );
};

export default Dashboard;
