import aptos from "@/lib/aptos";
import type { MoveStructId } from "@aptos-labs/ts-sdk";

export const fetchBalance = async (
  accountAddress: string,
  coinType: MoveStructId
) => {
  const bal = await aptos.getAccountCoinAmount({ accountAddress, coinType });
  return bal;
};
