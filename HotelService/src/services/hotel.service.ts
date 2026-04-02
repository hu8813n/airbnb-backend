
import { createHotelDTO, UpdateHotelDTO } from "../dto/hotel.dto";
import { createHotel, getAllHotels, getHotelById, updateHotel } from "../repository/hotel.repository";
import logger from "../config/logger.config";

const createHotelService = async (hotelData: createHotelDTO) => {
    // Here you can add any business logic related to hotel creation, such as validation, etc.
    // For now, we will just call the repository function to create the hotel.
    const hotel = await createHotel(hotelData);
    return hotel;
}

const getHotelByIdService = async (hotelId: number) => {
    // Here you can add any business logic related to fetching a hotel by ID, such as validation, etc.

    const hotel = await getHotelById(hotelId);
    return hotel;
}

const getAllHotelsService = async () => {
    // Here you can add any business logic related to fetching all hotels, such as filtering, pagination, etc.
    
    const hotels = await getAllHotels();
    return hotels;
}

const deleteHotelService = async (hotelId: number) => {

    logger.info(`Attempting to delete hotel with ID: ${hotelId}`);
    await getHotelById(hotelId); // Check if the hotel exists before attempting to delete
}

const updateHotelService = async (hotelId: number, data: UpdateHotelDTO) => {

    logger.info(`Attempting to update hotel with ID: ${hotelId} with data: ${JSON.stringify(data)}`);
    const hotel = await updateHotel(hotelId, data); // Check if the hotel exists before attempting to update
    return hotel;
}

export {
    createHotelService,
    getHotelByIdService,
    getAllHotelsService,
    deleteHotelService,
    updateHotelService
}