import { getScoreVarsShipInfo } from "@staratlas/factory";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { SA_SCORE_PROGRAMMID, SOLANANETWORK } from "@/extra/static/const";
import { RateLimiter } from "limiter";

export class StarAtlasFactory {
  private static limiter = new RateLimiter({
    tokensPerInterval: 150,
    interval: "hour",
  });

  static async getScoreAPR(ship_addresses: string[]) {
    /* const connection = new Connection(clusterApiUrl(SOLANANETWORK));
     
         console.log("getting APR");
         console.log(ship_addresses);
     
         for (const ship_address of ship_addresses) {
           console.log(ship_address);
           await this.limiter.removeTokens(1);
           const result = await getScoreVarsShipInfo(
             connection,
             SA_SCORE_PROGRAMMID,
             new PublicKey(ship_address)
           );
           console.log(result);
         }*/
  }
}
