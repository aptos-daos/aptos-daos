"use client";

import React, { useEffect, useState } from "react";
import { getTokenList } from "@/lib/panora";
import { useTokenStore } from "@/store/token";

const SecureProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTokenList } = useTokenStore();

  useEffect(() => {
    const fetchTokenList = async () => {
      const tokens = await getTokenList();
      setTokenList(tokens);
    };
    fetchTokenList();
  }, []);

  return <>{children}</>;
};

export default SecureProvider;
