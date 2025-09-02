export type JupiterSwapParams = {
  quote: JupiterQuoteResult;
  publicKey: string;
};

export type JupiterQuoteResult =
  | {
      inputMint: string;
      inAmount: string;
      outputMint: string;
      outAmount: string;
      otherAmountThreshold: string;
      swapMode: string;
      slippageBps: number;
      platformFee: number | null;
      priceImpactPct: string;
      routePlan: [
        {
          swapInfo: {
            ammKey: string;
            label: string;
            inputMint: string;
            outputMint: string;
            inAmount: string;
            outAmount: string;
            feeAmount: string;
            feeMint: string;
          };
          percent: number;
        },
      ];
      contextSlot: number;
      timeTaken: number;
    }
  | { error: string };

export type JupiterSwapResult = {
  swapTransaction: string;
  lastValidBlockHeight: number;
  prioritizationFeeLamports: number;
  computeUnitLimit: number;
  prioritizationType: {
    computeBudget: {
      microLamports: number;
      estimatedMicroLamports: number;
    };
  };
  dynamicSlippageReport: {
    slippageBps: number;
    otherAmount: number;
    simulatedIncurredSlippageBps: number;
    amplificationRatio: string;
    categoryName: string;
    heuristicMaxSlippageBps: number;
  };
  simulationError: string | null;
};
