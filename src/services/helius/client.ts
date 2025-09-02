import { Helius } from "helius-sdk";

const { HELIUS_API_KEY } = process.env;
let client: Helius | undefined;

const getClient = (): Helius => {
  if (!client) {
    client = new Helius(HELIUS_API_KEY);
  }

  return client;
};

export default getClient;
