import DAOAPI from "@/request/dao/dao.api";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ fund: string }>;
}) {
  const fundId = (await params).fund;
  const api = new DAOAPI();

  const dao = await api.getSingleDAO(fundId);

  if (!dao) {
    return notFound();
  }

  return <main>Fund Name: {String(dao)} {fundId}</main>;
}
