import { STARATLASWS } from "@/extra/static/const";
import { RateLimit } from "async-sema";

export class WS_StarAtlasMarket {
  private data: any;
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(STARATLASWS);
  }

  setup(markets: string[], onmessageCallback: any): void {
    const limit = RateLimit(20);
    this.ws.onopen = async () => {
      for (const market of markets) {
        this.ws.send(
          JSON.stringify({
            op: "subscribe",
            channel: "level1",
            markets: [market],
          })
        );
        await limit();
      }
    };
    this.ws.onmessage = onmessageCallback;
  }
}
