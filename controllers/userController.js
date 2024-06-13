import { registerUser, loginUser } from "../services/userService.js";
import { ApiError } from "../errors/ApiError.js";

export async function register (req,res,next) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(ApiError.badRequest(err.message));
    }
};

export async function login (req,res,next) {
    try {
        const user = await loginUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(ApiError.badRequest(err.message));
    }
};