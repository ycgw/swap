import getQuote from "../services/jupiter/quote";
import type { Keypair } from "@solana/web3.js";

import getSwap from "@services/jupiter/swap";
import broadcastTransaction from "@services/helius/broadcastTransaction";
import getTransaction from "@services/solana/transaction";
import { SOL_MINT, SELL_SLIPPAGE } from "@config";

const sell = async (mint: string, sellAmount: number, keyPair: Keypair) => {
  const publicKey = keyPair.publicKey.toString();

  // GET JUPITER QUOTE:
  const quote = await getQuote(mint, SOL_MINT, sellAmount, SELL_SLIPPAGE);

  // GET JUPITER SWAP:
  const swap = await getSwap(quote, publicKey, "sell");

  // GET TRANSACTION:
  const transaction = getTransaction(swap.swapTransaction);

  // SIGN TRANSACTION:
  transaction.sign([keyPair]);

  // SEND TRANSACTION:
  const signature = await broadcastTransaction(transaction);

  return signature;
};

export default sell;
