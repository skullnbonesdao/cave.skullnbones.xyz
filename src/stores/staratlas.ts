import { defineStore } from "pinia";
import { APIData } from "@/extra/static/staratlasapi";

import { STARATLASAPIURL } from "@/extra/static/const";
import { calculateRates } from "@/extra/calculator";

import { WS_StarAtlasMarket } from "@/extra/WS_StarAtlasMarket";
import { StarAtlasFactory } from "@/connectors/StarAtlasFactory";

export const staratlasStore = defineStore({
  id: "staratlas_store",
  state: () => ({
    counter: 0,
    assets: [] as Array<APIData>,
    assets_selected: [] as Array<APIData>,
    asset_types: new Set(),
    asset_type_selected: "ship",
    websocket: {} as WS_StarAtlasMarket,
  }),
  actions: {
    async fetchData() {
      this.counter = this.counter + 1;
      console.log("Fetching Data");
      await fetch(STARATLASAPIURL)
        .then((response) => response.json() as Promise<APIData[]>)
        .then((data) => (this.assets = data))
        .then(() => console.log("API-Data fetched"))
        .catch((err) => console.error(err));

      this.assets.forEach((asset: APIData) => {
        this.asset_types.add(asset.attributes.itemType);
        this.filterDataSelected();
      });
    },
    filterDataSelected() {
      this.assets_selected = this.assets.filter(
        (asset) => asset.attributes.itemType == this.asset_type_selected
      );
    },
    async initWebSocket() {
      console.log("init websocket...");
      this.websocket = new WS_StarAtlasMarket();

      const market_addresses: string[] = [];
      this.assets.forEach((asset) =>
        asset.markets.forEach((market) => market_addresses.push(market.id))
      );
      StarAtlasFactory.getScoreAPR(market_addresses);

      await this.websocket.setup(market_addresses, this.marketCallback);
    },
    sortData(entriesToSort: string, reverse: boolean, market_index: number) {
      market_index = 1;
      switch (entriesToSort) {
        case "name":
          this.assets_selected.sort(function (a, b) {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
          break;
        case "vwap":
          this.assets_selected.sort(function (a, b) {
            return a.tradeSettings.vwap > b.tradeSettings.vwap
              ? 1
              : a.tradeSettings.vwap < b.tradeSettings.vwap
              ? -1
              : 0;
          });
          break;
        case "ask":
          console.log("ASK");
          this.assets_selected.sort(function (a, b) {
            const ap = a.markets[market_index]?.dex?.bestAsk
              ? a.markets[market_index].dex?.bestAsk[0]
              : 0 || 0;
            const bp = b.markets[market_index]?.dex?.bestAsk
              ? b.markets[market_index].dex?.bestAsk[0]
              : 0 || 0;
            return (ap || 0) - (bp || 1);
          });
          break;
        case "bid":
          console.log("BID");
          this.assets_selected.sort(function (a, b) {
            const ap = a.markets[market_index]?.dex?.bestBid
              ? a.markets[market_index].dex?.bestBid[0]
              : 0 || 0;
            const bp = b.markets[market_index]?.dex?.bestBid
              ? b.markets[market_index].dex?.bestBid[0]
              : 0 || 0;
            return (ap || 0) - (bp || 0);
          });
          break;
        case "ask_usdc":
          console.log("ask_usdc");
          this.assets_selected
            //.map((assets) => assets.markets[market_index].percentages?.ask_usdc)
            .sort((a, b) => {
              return (a.rates?.ask_usdc || 0) - (b.rates?.ask_usdc || 0);
            });
          break;
        case "bid_usdc":
          console.log("bid_usdc");
          this.assets_selected
            //.map((assets) => assets.markets[market_index].percentages?.ask_usdc)
            .sort((a, b) => {
              return (a.rates?.bid_usdc || 0) - (b.rates?.bid_usdc || 0);
            });
          break;
      }
      if (reverse) {
        this.assets_selected.reverse();
      }
    },
    marketCallback(event: any) {
      const message = JSON.parse(event.data);
      if (!message) {
        return;
      }
      if (message.type === "quote") {
        for (const [i] of this.assets.entries()) {
          for (const [j] of this.assets[i].markets.entries()) {
            if (this.assets[i].markets[j].id == message.market) {
              //Assign WS data
              this.assets[i].markets[j].dex = message;
              //Calulate Percentages
              if (this.assets[i].markets[j].quotePair == "USDC") {
                this.assets[i].rates = calculateRates(
                  "all",
                  this.assets[i].markets[j].dex,
                  this.assets[i].rates ? this.assets[i].rates : undefined,
                  this.assets[i].tradeSettings.vwap
                );
              }
            }
          }
        }
      }
    },
  },
});
