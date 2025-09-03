import {Router} from "express";
import {index, save, remove, login, logout} from "../controllers/User.controller.js";

const router = Router();

router.post('/', index);
router.post('/save', save);
router.post('/delete', remove);
router.post('/login', login);
router.post('/logout', logout);

export default router