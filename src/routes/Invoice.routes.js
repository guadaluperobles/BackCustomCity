import {Router} from "express";
import {index, save, clear} from "../controllers/Invoice.controller.js";

const router = Router();

router.get('/', index);
router.post('/save', save);
router.post('/delete', clear);

export default router