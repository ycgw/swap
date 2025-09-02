export type TokenPriceData = {
  isScaledUiToken: boolean;
  value: number;
  updateUnixTime: number;
  updateHumanTime: string;
  priceInNative: number;
  priceChange24h: number;
  liquidity: number;
};

export type MultiPriceResult = {
  data: {
    [mintAddress: string]: TokenPriceData;
  };
  success: boolean;
  statusCode: number;
};
