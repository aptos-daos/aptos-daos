import type { Metadata } from "next";
import { WalletSelector } from "@/components/WalletSelector";
import SecureProvider from "@/provider/SecureProvider";

export const metadata: Metadata = {
  title: "Secure Pages",
};

export default function SecureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SecureProvider>
      <div className="w-fit">
        <WalletSelector secure/>
      </div>
      {children}
    </SecureProvider>
  );
}
