import { APIData, Markets } from "@/extra/static/staratlasapi";
import { Rates, StarAlasWSQuote } from "@/extra/static/staratlaswsquote";
import { UnwrapRef } from "vue";

export function calculateRates(
  type: string,
  dex_data: StarAlasWSQuote | undefined,
  rates: UnwrapRef<APIData["rates"]> | undefined,
  vwap: number
): Rates | undefined {
  if (!rates) {
    rates = JSON.parse(
      JSON.stringify({
        ask_atlas: 0.0,
        ask_usdc: 0.0,
        bid_atlas: 0.0,
        bid_usdc: 0.0,
      })
    );
  }
  if (rates) {
    rates.ask_usdc =
      (dex_data?.bestAsk != undefined ? dex_data.bestAsk[0] : 0) / vwap;
    rates.bid_usdc =
      (dex_data?.bestBid != undefined ? dex_data.bestBid[0] : 0) / vwap;

    //USDC - ask
    if (rates.ask_usdc !== 0) {
      if (rates.ask_usdc > 1.0) {
        rates.ask_usdc = rates.ask_usdc - 1;
      } else {
        rates.ask_usdc = -(1 - rates.ask_usdc);
      }
    }
    //USDC - bid

    if (rates.ask_usdc !== 0) {
      if (rates.bid_usdc > 1.0) {
        rates.bid_usdc = rates.bid_usdc - 1;
      } else {
        rates.bid_usdc = -(1 - rates.bid_usdc);
      }
    }
    return rates;
  }
  return undefined;
}
