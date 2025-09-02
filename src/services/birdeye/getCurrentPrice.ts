import { SOL_MINT } from "@config";
import type { MultiPriceResult } from "./types";

const { BIRDEYE_API_KEY } = process.env;

const getCurrentPrice = async (tokenMint: string) => {
  const url = `https://public-api.birdeye.so/defi/multi_price?list_address=${tokenMint},${SOL_MINT}&include_liquidity=true`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-API-KEY": BIRDEYE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`[birdeye/getCurrentPrice] API error: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as MultiPriceResult;

    if (!json.success || !json.data || !json.data[tokenMint] || !json.data[SOL_MINT]) {
      throw new Error(`[birdeye/getCurrentPrice] JSON error: ${JSON.stringify(json)}`);
    }

    const tokenPriceInUsd = json.data[tokenMint].value;
    const solPriceInUsd = json.data[SOL_MINT].value;
    const tokenLiquidity = json.data[tokenMint].liquidity;

    return { tokenPriceInUsd, solPriceInUsd, tokenLiquidity };
  } catch (error) {
    throw error;
  }
};

export default getCurrentPrice;
