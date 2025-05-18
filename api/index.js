import 'dotenv/config'
import express from 'express';
import connectDB from './config/db.js';
import protectedRoutes from './routes/protectedRoutes.js';
import path from 'path';
import cors from 'cors';
import pkg from 'body-parser';
import { fileURLToPath } from 'url';
const { json } = pkg;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
connectDB();

app.use(cors());
app.use(json());

app.use('/api/products', protectedRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



