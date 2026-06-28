import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', process.env.NEXTJS_URL || 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log('Servidor API corriendo en http://localhost:' + PORT);
});

export default app;
