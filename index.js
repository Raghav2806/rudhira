import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import { router } from "./routes/userRoutes.js";
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users',router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

