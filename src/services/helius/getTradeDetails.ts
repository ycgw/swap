import type { ParseTransactionsResponse } from "helius-sdk";

const { HELIUS_API_KEY } = process.env;

const MAX_ATTEMPTS = 300;
const DELAY_IN_MS = 100;

const getTradeDetails = async (transactionSignature: string, tokenMint: string) => {
  const url = new URL("https://api.helius.xyz/v0/transactions");

  url.searchParams.append("api-key", HELIUS_API_KEY);
  url.searchParams.append("commitment", "confirmed");

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactions: [transactionSignature],
        }),
      });

      if (!response.ok) {
        throw new Error(`[helius/getTradeDetails] API Error: ${response.status} ${response.statusText}`);
      }

      const json = (await response.json()) as ParseTransactionsResponse;

      if (!json || "error" in json) {
        throw new Error(`[helius/getTradeDetails] JSON Error: ${JSON.stringify(json.error)}`);
      }

      if (json[0] && json[0].accountData) {
        return json[0];
      }
    } catch (error) {
      console.error(`[helius/getTradeDetails] Attempt ${attempt} failed to fetch assets:`, error);
    }

    if (attempt < MAX_ATTEMPTS) {
      await Bun.sleep(DELAY_IN_MS);
    }
  }

  throw new Error(`[helius/getTradeDetails] Failed to get trade details for ${transactionSignature} (${tokenMint}) after ${MAX_ATTEMPTS}`);
};

export default getTradeDetails;
