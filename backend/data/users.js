// ============================================
// ARREGLO DE USUARIOS DEL SISTEMA
// ============================================
// Este archivo simula una base de datos de usuarios registrados.
// Se utiliza para autenticación y control de acceso en la aplicación.
// NOTA: En producción, las contraseñas nunca deben almacenarse en texto plano.

const users = [
  // ============================================
  // USUARIO 1: Christopher Cano
  // ============================================
  {
    id: 1,                          // Identificador único del usuario (número entero)
    name: 'Christopher Cano',       // Nombre completo del usuario (se muestra en la interfaz)
    email: 'estudiante@isil.pe',    // Correo electrónico (usado como nombre de usuario para login)
    password: '$2a$10$dummyhash',   // Contraseña hasheada con bcrypt (hash de ejemplo, no real)
    plainPassword: '123456',        // Contraseña en texto plano (SOLO PARA DESARROLLO/PRUEBAS)
    role: 'student',               // Rol del usuario: define los permisos dentro del sistema
  },

  // ============================================
  // USUARIO 2: Mario Haro
  // ============================================
  {
    id: 2,
    name: 'Mario Haro',
    email: 'mario@isil.pe',
    password: '$2a$10$dummyhash',   // Mismo hash dummy para ambos usuarios (demostración)
    plainPassword: '123456',        // Misma contraseña para facilitar pruebas
    role: 'student',               // Ambos usuarios tienen rol de estudiante
  },
];

// ============================================
// EXPORTACIÓN DEL MÓDULO
// ============================================
// Exporta el array 'users' como exportación por defecto,
// permitiendo importarlo en otros archivos con:
// import users from './ruta/al/archivo';

export default users;