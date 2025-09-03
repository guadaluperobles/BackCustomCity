import {Router} from "express";
import {index, save, remove, ratesQuery } from "../controllers/Rates.controller.js";

const router = Router();

router.get('/', index);
router.post('/save', save);
router.post('/delete', remove);
router.post('/query', ratesQuery);

export default router