import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, UpdateHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";


export async function createHotel(hotelData : createHotelDTO ) {
    // Implementation for creating a hotel
      const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount
    })

    logger.info(`Hotel created  successfully with data: ${JSON.stringify(hotel.toJSON())}`);
    return hotel;
}

export async function getHotelById(hotelId: number) {
    // Implementation for fetching a hotel by its ID
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel || hotel.deletedAt) {
        logger.warn(`Hotel with ID: ${hotelId} not found.`);
        throw new NotFoundError(`Hotel with ID: ${hotelId} not found.`);
    }
    logger.info(`Hotel with ID ${hotelId} retrieved successfully.`);
    return hotel;
}

export async function getAllHotels() {
    // Implementation for fetching all hotels

    const hotels = await Hotel.findAll({
        where: {
            deletedAt: null // Filter out hotels that have been soft deleted
        }
    });
    logger.info(`All hotels retrieved successfully. Total hotels: ${hotels.length}`);
    return hotels;
}

export async function softDeleteHotel(hotelId: number) {
    // Implementation for soft deleting a hotel by its ID

    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
        logger.warn(`Hotel with ID: ${hotelId} not found for deletion.`);
        throw new NotFoundError(`Hotel with ID: ${hotelId} not found..`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Hotel with ID ${hotelId} deleted successfully.`);
    return hotel;
    
}

export async function updateHotel(hotelId: number, data: UpdateHotelDTO) {
  const hotel = await Hotel.findByPk(hotelId);

  if (!hotel) {
    logger.warn(`Hotel with ID: ${hotelId} not found for update.`);
    throw new NotFoundError(`Hotel with ID: ${hotelId} not found for update.`);
  }

  await hotel.update(data);

  logger.info(`Hotel with ID ${hotelId} updated successfully with data: ${JSON.stringify(data)}`);

  return hotel; // ✅ already has fresh data after update()
}

