import { defineStore } from "pinia";
import { APIData } from "@/ts/staratlasapi";

import { STARATLASAPIURL } from "@/ts/const";

export const staratlasStore = defineStore({
  id: "staratlas_store",
  state: () => ({
    counter: 0,
    assets: [] as Array<APIData>,
    assets_selected: [] as Array<APIData>,
    asset_types: new Set(),
    asset_type_selected: "ship",
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
  },
});
