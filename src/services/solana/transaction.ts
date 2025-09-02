import { VersionedTransaction } from "@solana/web3.js";

const getTransaction = (swapTx: string) => {
  const buffer = Buffer.from(swapTx, "base64");
  const transaction = VersionedTransaction.deserialize(buffer);

  return transaction;
};

export default getTransaction;
