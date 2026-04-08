export interface CardGroup {
  name: string;
  quantity: number;
}

export interface GalleryCard {
  name: string;
  imageUrl: string;
}

export interface DeckList {
  creatures: CardGroup[];
  spells: CardGroup[];
  lands: CardGroup[];
  sideboard: CardGroup[];
}

export interface MetaDeck {
  id: string;
  tier: number;
  name: string;
  player?: string;
  colors: string[]; // e.g., ['w', 'u', 'b']
  keyCardsString: string;
  presence: string;
  winrate: string;
  creaturesCount: number;
  spellsCount: number;
  landsCount: number;
  gallery: GalleryCard[];
  fullList: DeckList;
  // UI State
  isExpanded: boolean;
  showFullList: boolean;
}
