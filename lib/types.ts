export interface Listing {
  id: number;
  title?: string;
  description?: string;
  price: number;
  location: string;
  zipCode?: number;
  propertyType?: string;
  bedrooms: number;
  bathrooms?: number;
  area: number;
  energyclass?: string;
  floors?: number;
  buildingFloors?: number;
  elevator?: boolean;
  furnished?: string;
  balcony?: boolean;
  garage?: number;
  heating?: string;
  listingType?: string;
  images: Image[];
}

export interface ListingId {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  zipCode?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  energyclass?: string;
  floors?: number;
  buildingFloors?: number;
  elevator?: boolean;
  furnished?: string;
  balcony?: boolean;
  garage?: number;
  heating?: string;
  listingType?: string;
  images: Image;
}

interface Image {
  id: number;
  url: string;
  listingId: number;
}

export interface SearchParams {
  listingType: string;
  propertyType: string;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
}
