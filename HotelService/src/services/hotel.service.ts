import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById } from "../repository/hotel.repository";

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

export {
    createHotelService,
    getHotelByIdService
}