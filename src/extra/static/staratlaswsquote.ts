export interface StarAlasWSQuote {
  type: string;
  market: string;
  timestamp: string;
  slot: number;
  version: number;
  bestAsk: number[];
  bestBid: number[];
}

export interface Rates {
  apr: number;
  ask_atlas: number;
  ask_usdc: number;
  bid_atlas: number;
  bid_usdc: number;
}

export interface Percentages {
  apr: number;
  ask_atlas: number;
  ask_usdc: number;
  bid_atlas: number;
  bid_usdc: number;
}
