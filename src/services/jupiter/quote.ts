import type { JupiterQuoteResult } from "./types";

const getQuote = async (inputMint: string, outputMint: string, amount: number, slippage: number) => {
  const url = new URL("https://lite-api.jup.ag/swap/v1/quote");

  url.searchParams.append("inputMint", inputMint);
  url.searchParams.append("outputMint", outputMint);
  url.searchParams.append("amount", String(amount));
  url.searchParams.append("slippageBps", String(slippage));
  url.searchParams.append("restrictIntermediateTokens", "true");

  console.log(`[jupiter/quote] Getting the quote...`);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`[jupiter/quote] API Error: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as JupiterQuoteResult;

    if (!json || "error" in json) {
      throw new Error(`[jupiter/quote] JSON Error: ${json.error}`);
    }

    console.log(`[jupiter/quote] Success!`);

    return json;
  } catch (error) {
    throw new Error(`[jupiter/quote] Error: ${error}`);
  }
};

export default getQuote;
