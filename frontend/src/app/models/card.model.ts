export interface Card {
  id: string;
  name: string;
  imageUrl: string;
  imageUrl2: string;
  manaCost: string[];
  type: string;
  rarity: string;
  oracleText: string;
  flavorText?: string;
  powerToughness?: string;
  legalities: {
    standard: 'legal' | 'not_legal' | 'banned';
    pioneer: 'legal' | 'not_legal' | 'banned';
    modern: 'legal' | 'not_legal' | 'banned';
    commander: 'legal' | 'not_legal' | 'banned';
  };
  price: number;
}
