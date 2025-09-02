import { dns } from "bun";
import readline from "readline";

import { TAKE_PROFIT_PERCENTAGE, STOP_LOSS_PERCENTAGE, LIQUIDITY_STOP_LOSS, POLLING_INTERVAL_MS } from "@config";
import getKeyPair from "@services/solana/keyPair";
import getCurrentPrice from "@services/birdeye/getCurrentPrice";
import buy from "@features/buy";
import sell from "@features/sell";

dns.prefetch("lite-api.jup.ag", 443);
dns.prefetch("mainnet.helius-rpc.com", 443);
dns.prefetch("api.helius.xyz", 443);

const main = async () => {
  const keyPair = getKeyPair();
  const mint = Bun.argv.slice(2)[0];
  let manualSellTriggered = false;

  // TODO: quick validation:
  if (!mint) {
    throw new Error("Token mint is invalid!");
  }

  // BUY TOKEN:
  const { tokenData } = await buy(mint, keyPair);

  // TP & SL:
  const takeProfitPriceInSol = tokenData.actualBuyPrice * (1 + TAKE_PROFIT_PERCENTAGE / 100);
  let stopLossPriceInSol = tokenData.actualBuyPrice * (1 - STOP_LOSS_PERCENTAGE / 100);

  // READLINE SETUP:
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.on("line", () => {
    console.log("\n[Manual] ENTER key pressed. Triggering sell...");
    manualSellTriggered = true;
    rl.close();
  });

  // MONITORING THE PRICE:
  while (true) {
    try {
      if (manualSellTriggered) {
        const signature = await sell(mint, tokenData.rawTokensReceived, keyPair);
        console.log(`\nMANUAL SELL: https://solscan.io/tx/${signature}`);
        break;
      }

      const { tokenPriceInUsd, solPriceInUsd, tokenLiquidity } = await getCurrentPrice(mint);
      const currentPriceInSol = tokenPriceInUsd / solPriceInUsd;
      const percentageGain = ((currentPriceInSol - tokenData.actualBuyPrice) / tokenData.actualBuyPrice) * 100;

      console.log(`[https://gmgn.ai/sol/token/${mint}] P/L: ${percentageGain.toFixed(2)}%`);

      // LIQUIDITY CHECK:
      if (tokenLiquidity < LIQUIDITY_STOP_LOSS) {
        const signature = await sell(mint, tokenData.rawTokensReceived, keyPair);

        console.log(`\n--- STOP LOSS (liquidity) triggered: https://solscan.io/tx/${signature} ---`);
        break;
      }

      if (currentPriceInSol <= stopLossPriceInSol) {
        const signature = await sell(mint, tokenData.rawTokensReceived, keyPair);

        console.log(`\n--- STOP LOSS: https://solscan.io/tx/${signature} ---`);
        break;
      }

      // TAKE PROFIT CHECK:
      if (currentPriceInSol >= takeProfitPriceInSol) {
        const signature = await sell(mint, tokenData.rawTokensReceived, keyPair);

        console.log(`\n--- TAKE PROFIT executed: https://solscan.io/tx/${signature} ---`);
        break;
      }
    } catch (error) {
      console.error("Error during price check:", error);
    }

    await Bun.sleep(POLLING_INTERVAL_MS);
  }

  rl.close();
  process.exit(0);
};

main();
