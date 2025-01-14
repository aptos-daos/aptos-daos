"use client";

import React from "react";
import DaoInitForm from "@/components/modules/dao-create-form";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const CreateDao = () => {
  const searchParams = useSearchParams();
  const defaultInviteCode = searchParams.get("invite") || "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <DaoInitForm  />
      </main>
     </Suspense>
  );
};

export default CreateDao;
