import { SWAP_BUY_MAX_LAMPORTS, SWAP_SELL_MAX_LAMPORTS, SWAP_BUY_PRIORITY_LEVEL, SWAP_SELL_PRIORITY_LEVEL } from "@config";
import type { JupiterQuoteResult, JupiterSwapResult } from "./types";

const getSwap = async (quoteResponse: JupiterQuoteResult, userPublicKey: string, direction: "buy" | "sell") => {
  const url = "https://lite-api.jup.ag/swap/v1/swap";
  const maxLamports = direction === "buy" ? SWAP_BUY_MAX_LAMPORTS : SWAP_SELL_MAX_LAMPORTS;
  const priorityLevel = direction === "buy" ? SWAP_BUY_PRIORITY_LEVEL : SWAP_SELL_PRIORITY_LEVEL;

  console.log(`[jupiter/swap] Getting the swap transaction...`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        dynamicComputeUnitLimit: true,
        dynamicSlippage: true,
        // TODO: https://docs.jito.wtf/
        prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            maxLamports,
            priorityLevel,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`[jupiter/swap] API error: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as JupiterSwapResult;

    if (!json || "error" in json) {
      throw new Error(`[jupiter/swap] JSON error: ${json.error}`);
    }

    if (!json.swapTransaction) {
      throw new Error(`[jupiter/swap] Failed to get swapTransaction: ${JSON.stringify(json)}`);
    }

    console.log(`[jupiter/swap] Success!`);

    return json;
  } catch (error) {
    throw new Error(`[jupiter/swap] Error: ${error}`);
  }
};

export default getSwap;
