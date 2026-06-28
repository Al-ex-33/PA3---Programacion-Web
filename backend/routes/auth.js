import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Para el mock, comparamos con plainPassword
    // En produccion: bcrypt.compare(password, user.password)
    if (password !== user.plainPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// GET /api/auth/me - Obtener info del usuario autenticado
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
