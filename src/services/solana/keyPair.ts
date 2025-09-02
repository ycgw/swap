import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const { WALLET_PRIVATE_KEY } = process.env;

const getKeyPair = () => {
  const secretKey = bs58.decode(WALLET_PRIVATE_KEY);
  const keyPair = Keypair.fromSecretKey(secretKey);

  return keyPair;
};

export default getKeyPair;
