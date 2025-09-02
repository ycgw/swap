import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { AccountData } from "helius-sdk";

const getTokenDataFromAccountData = (accountData: AccountData[], ownerAddress: string, tokenMint: string) => {
  const userAccount = accountData.find(acc => acc.account === ownerAddress);
  let rawTokensReceived = 0;
  let tokensReceived = 0;

  if (!userAccount || userAccount.nativeBalanceChange >= 0) {
    throw new Error(`[helius/getTokenDataFromAccountData] Can't find the user account: ${JSON.stringify(accountData)}`);
  }

  const solSpent = Math.abs(userAccount.nativeBalanceChange) / LAMPORTS_PER_SOL;

  for (const account of accountData) {
    const tokenChange = account.tokenBalanceChanges?.find(change => change.mint === tokenMint && change.userAccount === ownerAddress);

    if (tokenChange) {
      const { tokenAmount, decimals } = tokenChange.rawTokenAmount;
      const amount = Number(tokenAmount);

      if (amount > 0) {
        rawTokensReceived = amount;
        tokensReceived = amount / 10 ** decimals;
        break;
      }
    }
  }

  if (tokensReceived === 0) {
    throw new Error("[helius/getTokenDataFromAccountData] Could not find tokens received in the transaction.");
  }

  const actualBuyPrice = solSpent / tokensReceived;

  return { solSpent, rawTokensReceived, tokensReceived, actualBuyPrice };
};

export default getTokenDataFromAccountData;
