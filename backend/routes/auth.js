// ============================================
// IMPORTACIONES DE DEPENDENCIAS Y MÓDULOS
// ============================================

// Router de Express: permite crear rutas modulares y montarlas
// en la aplicación principal (ej: app.use('/api/auth', authRoutes))
import { Router } from 'express';

// bcryptjs: librería para hashear y comparar contraseñas de forma segura.
// Aunque se importa, en este archivo solo se usa para el mock (comentario).
// En producción se usaría bcrypt.compare() para verificar contraseñas hasheadas.
import bcrypt from 'bcryptjs';

// jsonwebtoken: librería para crear y verificar tokens JWT.
// Se usa para generar un token de autenticación al iniciar sesión.
import jwt from 'jsonwebtoken';

// Datos de usuarios simulados (base de datos en memoria).
// Contiene usuarios con id, name, email, password, plainPassword y role.
import users from '../data/users.js';

// Middleware de autenticación que verifica el token JWT en las peticiones.
// Protege rutas privadas asegurando que solo usuarios autenticados accedan.
import { authenticateToken } from '../middleware/auth.js';

// ============================================
// CREACIÓN DEL ROUTER
// ============================================
// Se crea una instancia de Router para definir las rutas de autenticación.
// Este router manejará todas las peticiones bajo el prefijo /api/auth

const router = Router();

// ============================================
// RUTA POST /api/auth/login
// ============================================
// Endpoint para iniciar sesión. Recibe email y contraseña,
// valida las credenciales y devuelve un token JWT si son correctas.

router.post('/login', async (req, res) => {
  try {
    // ============================================
    // EXTRAER CREDENCIALES DEL CUERPO DE LA PETICIÓN
    // ============================================
    // req.body contiene los datos enviados por el cliente (JSON).
    // Se usa destructuring para obtener email y password.
    
    const { email, password } = req.body;

    // ============================================
    // VALIDACIÓN DE CAMPOS REQUERIDOS
    // ============================================
    // Verifica que ambos campos estén presentes.
    // Si falta alguno, responde con error 400 (Bad Request).
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // ============================================
    // BUSCAR USUARIO POR EMAIL
    // ============================================
    // Busca en el array de usuarios el que coincida con el email proporcionado.
    // En producción esto sería una consulta a la base de datos.
    
    const user = users.find((u) => u.email === email);

    // ============================================
    // VERIFICAR SI EL USUARIO EXISTE
    // ============================================
    // Si no se encuentra el usuario, responde con error 401 (Unauthorized).
    // Se usa un mensaje genérico ("Credenciales inválidas") para no revelar
    // si el email existe o no (medida de seguridad contra enumeración de usuarios).
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // ============================================
    // VERIFICAR LA CONTRASEÑA (MODO DESARROLLO)
    // ============================================
    // NOTA: Esta comparación directa (===) es SOLO PARA DESARROLLO/PRUEBAS.
    // Usa plainPassword que está en texto plano en el mock de usuarios.
    // 
    // EN PRODUCCIÓN se debe usar:
    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) { ... }
    //
    // bcrypt.compare() hashea la contraseña ingresada y la compara con
    // el hash almacenado de forma segura (sin exponer la contraseña real).
    
    if (password !== user.plainPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // ============================================
    // GENERAR TOKEN JWT
    // ============================================
    // jwt.sign() crea un token firmado con la información del usuario.
    // 
    // Payload (datos incrustados en el token):
    //   - id: identificador único del usuario
    //   - name: nombre completo
    //   - email: correo electrónico
    //   - role: rol para control de permisos
    //
    // process.env.JWT_SECRET: clave secreta para firmar el token
    //   (debe estar en variables de entorno, nunca en el código).
    //
    // Opciones:
    //   - expiresIn: tiempo de validez del token. Usa la variable de entorno
    //     JWT_EXPIRES_IN o, si no existe, un valor por defecto de '2h' (2 horas).
    //     Después de este tiempo, el token expira y el usuario debe volver a loguearse.
    
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    // ============================================
    // RESPUESTA EXITOSA
    // ============================================
    // Devuelve el token JWT y la información básica del usuario.
    // El cliente debe almacenar el token (localStorage, cookies) y enviarlo
    // en el header Authorization de las peticiones posteriores.
    
    res.json({
      token,  // Token JWT que el cliente usará para autenticarse
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    
  } catch (error) {
    // ============================================
    // MANEJO DE ERRORES DEL SERVIDOR
    // ============================================
    // Si ocurre cualquier error inesperado (ej: JWT_SECRET no definido),
    // responde con código 500 (Internal Server Error).
    
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ============================================
// RUTA GET /api/auth/me
// ============================================
// Endpoint protegido que devuelve la información del usuario autenticado.
// El middleware authenticateToken verifica el token JWT antes de ejecutar
// esta función. Si el token es válido, los datos del usuario decodificados
// quedan disponibles en req.user.
//
// Uso del cliente:
// GET /api/auth/me
// Headers: { Authorization: "Bearer <token>" }

router.get('/me', authenticateToken, (req, res) => {
  // req.user fue asignado por el middleware authenticateToken
  // Contiene el payload decodificado del token: { id, name, email, role, iat, exp }
  
  res.json({ user: req.user });
});

// ============================================
// EXPORTACIÓN DEL ROUTER
// ============================================
// Exporta el router para que pueda ser importado y montado
// en la aplicación principal de Express.
// Ejemplo de uso en app.js:
// import authRoutes from './routes/auth.js';
// app.use('/api/auth', authRoutes);

export default router;