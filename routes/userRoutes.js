import express from "express";
import { register, login, mail } from "../controllers/userController.js";

export const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/mail', mail);