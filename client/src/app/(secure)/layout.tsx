import type { Metadata } from "next";
import { WalletSelector } from "@/components/WalletSelector";

export const metadata: Metadata = {
  title: "Secure Pages",
};

export default function SecureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-fit">
        <WalletSelector secure/>
      </div>
      {children}
    </>
  );
}
