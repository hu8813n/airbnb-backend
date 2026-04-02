import { NextFunction, Request, Response } from "express";
import { createHotelService, getHotelByIdService } from "../services/hotel.service";
import { createHotelDTO } from "../dto/hotel.dto";

const createHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
        // Here you can add any validation logic for the incoming request data if needed.
        // For now, we will just pass the request body to the service layer.
        const hotelData: createHotelDTO = req.body;
        const hotel = await createHotelService(hotelData);
        res.status(201).json({
            success: true,
            data: hotel,
            message: 'Hotel created successfully'
        });
    
}

const getHotelByIdHandler = async (req: Request, res: Response, next : NextFunction) => {
    // Here you can add any validation logic for the incoming request data if needed.
    // For now, we will just pass the hotel ID from the request params to the service layer.
    const hotelId = Number(req.params.id);
    const hotel = await getHotelByIdService(hotelId);
    res.status(200).json({
        success: true,
        data: hotel,
        message: 'Hotel retrieved successfully'
    });
}

const  getAllHotelsHandler = async (req: Request, res: Response, next : NextFunction) => {
    // This handler can be implemented to fetch and return all hotels.
    // For now, it's just a placeholder.
    res.status(501);
} 

const deleteHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
    // This handler can be implemented to delete a hotel by its ID.
    // For now, it's just a placeholder.
    res.status(501);
}

const updateHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
    // This handler can be implemented to update a hotel by its ID.
    // For now, it's just a placeholder.
    res.status(501);
}



export {
    createHotelHandler,
    getHotelByIdHandler,
    getAllHotelsHandler,
    deleteHotelHandler,
    updateHotelHandler
}