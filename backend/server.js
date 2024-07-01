import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';
import {fileURLToPath} from 'url';

import connectDB from "./config/db.js";
import mapRoutes from "./routes/mapRoutes.js";
import auth from "./routes/auth.js";
// const mapRoutes = require("./routes/mapRoutes");


const PORT = process.env.PORT || 5555;

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", mapRoutes);
app.use('/api/auth', auth);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));