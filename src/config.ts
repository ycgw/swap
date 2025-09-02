export const SOL_MINT = "So11111111111111111111111111111111111111112";

// JUPITER CONFIG:
export const BUY_AMOUNT = 250000000; // 0.25 SOL
export const BUY_SLIPPAGE = 300; // 3%
export const SELL_SLIPPAGE = 1500; // 15%
export const SWAP_BUY_MAX_LAMPORTS = 225000; // 0.000225 SOL, TODO: getRecentPrioritizationFees
export const SWAP_SELL_MAX_LAMPORTS = 7500000; // 0.0075 SOL, TODO: getRecentPrioritizationFees
export const SWAP_BUY_PRIORITY_LEVEL = "high";
export const SWAP_SELL_PRIORITY_LEVEL = "high";

// TP & SL:
export const TAKE_PROFIT_PERCENTAGE = 66;
export const STOP_LOSS_PERCENTAGE = 66;
export const LIQUIDITY_STOP_LOSS = 200;

// PRICE MONITORING:
export const POLLING_INTERVAL_MS = 333;
