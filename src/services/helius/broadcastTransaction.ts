import { VersionedTransaction } from "@solana/web3.js";
import getClient from "./client";

const broadcastTransaction = async (transaction: VersionedTransaction) => {
  const helius = getClient();

  try {
    const signature = await helius.rpc.broadcastTransaction(transaction, {
      skipPreflight: true,
      maxRetries: 3,
      pollTimeoutMs: 30000, // 30s
      pollIntervalMs: 333, // 333ms
    });

    console.log(`[helius/broadcastTransaction] Swap confirmed!`);

    return signature;
  } catch (error) {
    throw new Error(`[helius/broadcastTransaction] Swap failed: ${error}`);
  }
};

export default broadcastTransaction;
