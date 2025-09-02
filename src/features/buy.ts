import type { Keypair } from "@solana/web3.js";

import getQuote from "@services/jupiter/quote";
import getSwap from "@services/jupiter/swap";
import broadcastTransaction from "@services/helius/broadcastTransaction";
import getTransaction from "@services/solana/transaction";
import getTradeDetails from "@services/helius/getTradeDetails";
import getTokenDataFromAccountData from "@services/helius/getTokenDataFromAccountData";
import { SOL_MINT, BUY_AMOUNT, BUY_SLIPPAGE } from "@config";

const buy = async (mint: string, keyPair: Keypair) => {
  const publicKey = keyPair.publicKey.toString();

  // GET JUPITER QUOTE:
  const quote = await getQuote(SOL_MINT, mint, BUY_AMOUNT, BUY_SLIPPAGE);

  // GET JUPITER SWAP:
  const swap = await getSwap(quote, publicKey, "buy");

  // GET TRANSACTION:
  const transaction = getTransaction(swap.swapTransaction);

  // SIGN TRANSACTION:
  transaction.sign([keyPair]);

  // SEND TRANSACTION:
  const signature = await broadcastTransaction(transaction);

  // GET TOKEN AMOUNT:
  const tradeDetails = await getTradeDetails(signature, mint);

  // GET BOUGHT TOKEN DATA:
  const tokenData = getTokenDataFromAccountData(tradeDetails.accountData, publicKey, mint);

  return {
    signature,
    tokenData,
  };
};

export default buy;
