import { ToastProvider } from "@/components/ui/toast";
import React from "react";

const RootLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default RootLayoutProvider;
