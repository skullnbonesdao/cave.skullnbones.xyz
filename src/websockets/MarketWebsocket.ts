import { SERUMAPIWEBSOCKET } from "@/websockets/const";
import { Convert, MarketLevel1 } from "@/websockets/types/MarketLevel1";
import { Ref, ref } from "vue";

export class MarketWebsocket {
  private static ws: WebSocket;
  private static markets: Ref<MarketLevel1[]>;

  static init() {
    this.ws = new WebSocket(SERUMAPIWEBSOCKET);
  }

  static initMarkets(markets: Ref<MarketLevel1[]>) {
    this.markets = markets;
    this.init();
    const sub_btc_L1 = {
      op: "subscribe",
      channel: "level1",
      markets: ["BTC/USDC"],
    };
    const sub_sol_L1 = {
      op: "subscribe",
      channel: "level1",
      markets: ["SOL/USDC"],
    };
    const sub_polis_L1 = {
      op: "subscribe",
      channel: "level1",
      markets: ["POLIS/USDC"],
    };
    const sub_atlas_L1 = {
      op: "subscribe",
      channel: "level1",
      markets: ["ATLAS/USDC"],
    };

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(sub_btc_L1));
      this.ws.send(JSON.stringify(sub_sol_L1));
      this.ws.send(JSON.stringify(sub_polis_L1));
      this.ws.send(JSON.stringify(sub_atlas_L1));
      console.info("Created MarketWebsocket");
    };

    this.ws.onmessage = (event: MessageEvent) => {
      const new_market_data = Convert.toMarketLevel1(event.data);
      if (new_market_data.type === "quote") {
        if (
          this.markets.value.find(
            (market) => market.market == new_market_data.market
          )
        ) {
          this.markets.value = this.markets.value.map(function (market) {
            return market.market == new_market_data.market
              ? new_market_data
              : market;
          });
        } else {
          this.markets.value.push(new_market_data);
        }
      }
    };
  }
}
