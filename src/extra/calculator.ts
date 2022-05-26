import { Markets } from "@/extra/static/staratlasapi";
import { Rates, StarAlasWSQuote } from "@/extra/static/staratlaswsquote";

export function calcuatePercentages(
  type: string,
  market: Markets,
  price: number
): Markets {
  console.log("TYPE: " + type + ", Ship:" + market + ", price:" + price);

  if (market.quotePair == "USDC") {
    if (!market.percentages) {
      const p = {
        ask_atlas: 0.0,
        ask_usdc: 0.0,
        bid_atlas: 0.0,
        bid_usdc: 0.0,
      };
      market.percentages = JSON.parse(JSON.stringify(p));
    }

    switch (type) {
      case "ask":
        if (market.percentages && market.dex) {
          market.percentages.ask_usdc =
            (market.dex.bestAsk != undefined ? market.dex.bestAsk[0] : 0) /
            price;
          market.percentages.bid_usdc = market.dex.bestBid[0] / price;
        }
        //market.market.percentages.ask_atlas = 0.0;
        //market.market.percentages.ask_atlas = 0.0;
        break;
    }
    return market;
  }
  return market;
}

export function calculateRates(
  type: string,
  dex_data: StarAlasWSQuote,
  rates: Rates,
  vwap: number
): Rates {
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
  rates.ask_usdc =
    (dex_data.bestAsk != undefined ? dex_data.bestAsk[0] : 0) / vwap;
  rates.bid_usdc =
    (dex_data.bestBid != undefined ? dex_data.bestBid[0] : 0) / vwap;
  return rates;
}
