# SWAP

<p align="center">
<img src="https://github.com/user-attachments/assets/2a726383-8c51-4c0f-b339-8e3fae22bdd1" />
</p>

> Talk, we need SWAP in here, multiple tokens armed with an insane transaction volume on the corner of pump.fun and bonk!

## Description
This command-line tool automatically buys and sells Solana tokens based on predefined profit and loss targets.

The tool leverages the [Jupiter API](https://dev.jup.ag/docs/api) for swaps, the [Helius API](https://www.helius.dev/docs/api-reference) for broadcasting transactions and fetching trade details, and the [Birdeye API](https://docs.birdeye.so/docs/overview) for price monitoring.

## Features

- **Automatic Trading**: buys a token and automatically sells it based on take-profit and stop-loss percentages;
- **Manual Sell**: allows for manual selling of the token by pressing the Enter key;
- **Liquidity Protection**: sells the token automatically if the liquidity drops below a certain threshold;
- **Price Monitoring**: continuously monitors the token's price and displays the profit/loss percentage;

## Installation

Clone the repository & install the dependencies:

```bash
  git clone https://github.com/ycgw/swap.git && cd swap && bun install
```

## Usage

1.  Create a `.env` file in the root of the project:

```bash
touch .env
```

2. Fill the `.env` file using `.env.test` as an example:

```
HELIUS_API_KEY=
BIRDEYE_API_KEY=
WALLET_PRIVATE_KEY=
```

3. Run the tool with the token mint address as an argument:

```bash
bun run src/index.ts EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

## Configuration

The following parameters can be configured in the `src/config.ts` file:

- `TAKE_PROFIT_PERCENTAGE`: the percentage at which to take profit;
- `STOP_LOSS_PERCENTAGE`: the percentage at which to stop loss;
- `LIQUIDITY_STOP_LOSS`: the liquidity threshold at which to sell the token;
- `POLLING_INTERVAL_MS`: the interval at which to poll for the token's price;
- `BUY_AMOUNT`: the amount of SOL to use for buying the token;
- `BUY_SLIPPAGE`: the slippage to use for buying the token;
- `SELL_SLIPPAGE`: the slippage to use for selling the token;

  <br />

> [!WARNING]
> This tool is for educational purposes only. Trading cryptocurrencies is risky, and you should never invest more than you can afford to lose. The author is not responsible for any financial losses you may incur by using this tool.
