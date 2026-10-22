import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import dictationRoutes from './routes/dictationRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import vocabRoutes from './routes/vocabRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dictation', dictationRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/vocabulary', vocabRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'EnglishHub Backend API Server is running' });
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
