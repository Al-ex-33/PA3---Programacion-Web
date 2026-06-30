// ============================================
// IMPORTACIÓN DE LA LIBRERÍA JWT
// ============================================
// Se importa el módulo 'jsonwebtoken' para verificar la validez
// de los tokens JWT enviados por el cliente en las peticiones HTTP.
// JWT (JSON Web Token) es un estándar para transmitir información
// de forma segura entre el cliente y el servidor.

import jwt from 'jsonwebtoken';

// ============================================
// MIDDLEWARE DE AUTENTICACIÓN
// ============================================
// Esta función es un middleware de Express que protege rutas privadas.
// Un middleware es una función que se ejecuta entre la petición del
// cliente y la respuesta del servidor, permitiendo interceptar y
// procesar la solicitud antes de llegar al controlador final.
//
// Uso típico:
// router.get('/perfil', authenticateToken, (req, res) => { ... });

export function authenticateToken(req, res, next) {
  
  // ============================================
  // EXTRAER EL HEADER DE AUTORIZACIÓN
  // ============================================
  // req.headers['authorization'] obtiene el header HTTP 'Authorization'
  // que el cliente envía con el token. Este header tiene el formato:
  // Authorization: Bearer <token>
  // Ejemplo: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  
  const authHeader = req.headers['authorization'];

  // ============================================
  // EXTRAER EL TOKEN DEL HEADER
  // ============================================
  // authHeader.split(' ') divide el string por espacios:
  // ["Bearer", "eyJhbGciOiJIUzI1NiIs..."]
  // [1] accede al segundo elemento (índice 1), que es el token real.
  // El operador && asegura que si authHeader es undefined/null,
  // no se intente hacer split y token sea undefined.
  
  const token = authHeader && authHeader.split(' ')[1];

  // ============================================
  // VERIFICAR SI EXISTE EL TOKEN
  // ============================================
  // Si no hay token, significa que el cliente no está autenticado
  // o no envió el header de autorización.
  // Se responde con código HTTP 401 (Unauthorized - No autorizado),
  // indicando que la autenticación es requerida.
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // ============================================
  // VERIFICAR Y DECODIFICAR EL TOKEN
  // ============================================
  // Se usa un bloque try-catch porque jwt.verify() lanza un error
  // si el token es inválido, ha expirado o la firma no coincide.
  // process.env.JWT_SECRET es la clave secreta usada para firmar
  // el token (debe estar en variables de entorno por seguridad).
  
  try {
    // jwt.verify() decodifica el token y devuelve el payload
    // (datos que fueron incrustados al crear el token, como id, email, role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ============================================
    // ADJUNTAR DATOS DEL USUARIO A LA PETICIÓN
    // ============================================
    // Se guarda la información decodificada del usuario en req.user,
    // para que las rutas protegidas puedan acceder a los datos
    // del usuario autenticado (ej: req.user.id, req.user.email).
    
    req.user = decoded;

    // ============================================
    // CONTINUAR CON LA SIGUIENTE FUNCIÓN
    // ============================================
    // next() pasa el control al siguiente middleware o al controlador
    // de la ruta. Si no se llama next(), la petición queda "colgada".
    
    next();
    
  } catch (err) {
    // ============================================
    // MANEJO DE ERRORES DEL TOKEN
    // ============================================
    // Si el token es inválido (firma incorrecta) o ha expirado
    // (pasó el tiempo límite definido al crearlo), se captura
    // el error y se responde con código HTTP 403 (Forbidden - Prohibido).
    // 403 indica que el cliente está autenticado (envió token) pero
    // no tiene permiso/acceso válido.
    
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
