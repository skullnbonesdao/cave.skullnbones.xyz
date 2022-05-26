import { defineStore } from "pinia";
import { APIData } from "@/extra/static/staratlasapi";

import { STARATLASAPIURL } from "@/extra/static/const";
import { WS_StarAtlasMarket } from "@/extra/WS_StarAtlasMarket";
import { calculateRates } from "@/extra/calculator";

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
      console.log(market_addresses);

      await this.websocket.setup(market_addresses, this.marketCallback);
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
                  this.assets[i].rates,
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
