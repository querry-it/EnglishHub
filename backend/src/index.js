import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import vocabRoutes from './routes/vocabRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/vocab', vocabRoutes);
app.get('/api', (req, res) => {
  res.json({ message: 'Express Backend API Server running' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
