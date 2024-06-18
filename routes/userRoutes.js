import express from "express";
import { register, login, forgotPassword, updatePassword } from "../controllers/userController.js";

export const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);

router.post('/updatePassword', updatePassword);