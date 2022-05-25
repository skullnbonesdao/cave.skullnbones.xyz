export interface Media {
  qrInstagram: string;
  qrFacebook: string;
  sketchfab: string;
  audio: string;
  thumbnailUrl: string;
  gallery?: any;
}

export interface Attributes {
  itemType: string;
  tier: number;
  class: string;
  category: string;
  score: number;
  rarity: string;
  musician: string;
}

export interface Markets {
  _id: string;
  id: string;
  quotePair: string;
}

export interface TradeSetting {
  expireTime: number;
  saleTime: number;
  vwap: number;
}

export interface Collection {
  name: string;
  family: string;
}

export interface Slot {
  crewSlots?: any;
  componentSlots?: any;
  moduleSlots?: any;
}

export interface APIData {
  _id: string;
  deactivated: boolean;
  name: string;
  description: string;
  image: string;
  media: Media;
  attributes: Attributes;
  symbol: string;
  markets: Markets[];
  totalSupply: number;
  mint: string;
  network: string;
  tradeSettings: TradeSetting[];
  airdrops: any[];
  primarySales: any[];
  updatedAt: string;
  collection: Collection;
  slots: Slot[];
  id: string;
}

/*

export type APIData = RootDataItem;
*/
