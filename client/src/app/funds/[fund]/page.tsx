import PreviewDisplay from "@/components/modules/preview-display";
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

  // TODO: Implement Portfolio Number and Percentage

  return (
    <main>
      <PreviewDisplay portfolioPercentage={43} portfolioSize={1200} {...dao} />
    </main>
  );
}
