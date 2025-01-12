const PANORA_END_POINT = "https://api.panora.exchange";

export async function swap(
  fromToken: string,
  toToken: string,
  amount: string,
  walletAddress: string
): Promise<any> {
  // TREASURY WALLET ADDRESS
  const query = {
    fromTokenAddress: fromToken,
    toTokenAddress: toToken,
    fromTokenAmount: amount,
    toWalletAddress: walletAddress,
  };

  const headers = {
    "x-api-key": process.env.NEXT_PUBLIC_PANORA_API_KEY as string,
  };

  const queryString = new URLSearchParams(query).toString();
  const url = `${PANORA_END_POINT}/swap?${queryString}`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
  });

  return response.json();
}

export async function getSwapQuote(
  fromToken: string,
  toToken: string,
  amount: string
): Promise<any> {
  const query = {
    fromTokenAddress: fromToken,
    toTokenAddress: toToken,
    fromTokenAmount: amount,
  };

  const headers = {
    "x-api-key": process.env.NEXT_PUBLIC_PANORA_API_KEY as string,
  };

  const queryString = new URLSearchParams(query).toString();
  const url = `${PANORA_END_POINT}/swap/quote?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  return response.json();
}

export async function getTokenList(): Promise<Token[]> {
  const query = {
    isInPanoraTokenList: "true",
  };

  const queryString = new URLSearchParams(query);
  const headers = {
    "x-api-key": process.env.NEXT_PUBLIC_PANORA_API_KEY as string,
  };

  const url = `${PANORA_END_POINT}/tokenlist?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json().then((data) => data.data);

  return data;
}
