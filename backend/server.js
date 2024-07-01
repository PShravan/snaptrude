import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';
import {fileURLToPath} from 'url';

import connectDB from "./config/db.js";
import mapRoutes from "./routes/mapRoutes.js";
import auth from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Adjust CORS as needed for production
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", mapRoutes);
app.use('/api/auth', auth);

// For Vercel, export the Express app
export default app;