
export type createHotelDTO = {
    name: string;
    address: string;
    location: string;
    rating?: number;
    ratingCount?: number;
}

// src/dtos/hotel.dto.ts
export type UpdateHotelDTO = {
  name?: string;
  address?: string;
  location?: string;
  rating?: number;
  ratingCount?: number;
}