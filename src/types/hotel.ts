export interface Offer {
  name: string;
  description: string;
  price: number;
}

export interface Locale {
  currency: string;
  language: string;
}

export interface Hotel {
  name: string;
  description: string;
  image: string;
  locale: Locale;
  offers: Offer[];
} 


export interface HotelState {
    hotels: Hotel[];
    selectedCurrency: string;
    sortOrder: 'lowest' | 'highest';
  }