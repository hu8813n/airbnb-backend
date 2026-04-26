import RoomCategory from "../db/models/roomCategory";
import BaseRepository from "./base.repository";

class RoomCategoryRepository extends BaseRepository<RoomCategory> {

    constructor() {
        super(RoomCategory);
    }
}