import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create DAO",
};

export default function CreateDaoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
