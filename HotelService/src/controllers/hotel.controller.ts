import {StatusCodes} from  "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService, updateHotelService } from "../services/hotel.service";
import { createHotelDTO, UpdateHotelDTO } from "../dto/hotel.dto";


const createHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
        // Here you can add any validation logic for the incoming request data if needed.
        // For now, we will just pass the request body to the service layer.
        const hotelData: createHotelDTO = req.body;
        const hotel = await createHotelService(hotelData);
        res.status(StatusCodes.CREATED).json({
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
    const hotels = await getAllHotelsService();
    res.status(200).json({
        success: true,
        data: hotels,
        message: 'Hotels retrieved successfully'
    });
} 

const deleteHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
    // This handler can be implemented to delete a hotel by its ID.
    // For now, it's just a placeholder.
     const hotel = await deleteHotelService(Number(req.params.id));
    res.status(StatusCodes.OK).json({  
        success: true,       
        message: 'Hotel deleted successfully',
        data: hotel
    });
}

const updateHotelHandler = async (req: Request, res: Response, next : NextFunction) => {
    
    const hotelId = Number(req.params.id);
    const data: UpdateHotelDTO = req.body;
    const hotel = await updateHotelService(hotelId, data);
    res.status(StatusCodes.OK).json({
        success: true,
        data: hotel,
        message: 'Hotel updated successfully'
    });
}



export {
    createHotelHandler,
    getHotelByIdHandler,
    getAllHotelsHandler,
    deleteHotelHandler,
    updateHotelHandler
}