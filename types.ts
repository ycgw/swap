declare module "bun" {
  interface Env {
    HELIUS_API_KEY: string;
    BIRDEYE_API_KEY: string;
    WALLET_PRIVATE_KEY: string;
  }
}
