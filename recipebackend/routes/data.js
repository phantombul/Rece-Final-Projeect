import express from "express";
const router = express.Router();
import {editAllegyHandler, editFavouriteHandler} from '../controllers/data.js';

router.patch('/allergy/:email', editAllegyHandler); // patch request to /update/allergy/raf@email.com {allergies: [dairy, gluten, nuts]}
router.patch('/favourite/:email', editFavouriteHandler); //

export default router;
