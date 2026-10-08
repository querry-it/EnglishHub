import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import dictationRoutes from './routes/dictationRoutes.js';

// import courseRoutes from './routes/courseRoutes.js';
// import vocabRoutes from './routes/vocabRoutes.js';

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
app.use('/api/dictation', dictationRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/vocab', vocabRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Express Backend API Server running' });
});

// Middleware xử lý lỗi toàn cục (Global Error Handler)
app.use((err, req, res, next) => {
  console.error('Lỗi hệ thống:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Đã có lỗi xảy ra trên máy chủ!'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
