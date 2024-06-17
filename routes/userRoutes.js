import express from "express";
import { register, login, forgotPassword } from "../controllers/userController.js";

export const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);