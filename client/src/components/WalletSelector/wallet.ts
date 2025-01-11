import aptos from "@/lib/aptos";

export const fetchBalance = async (address: string) => {
  const bal = await aptos.getAccountAPTAmount({ accountAddress: address });
  return bal;
};
