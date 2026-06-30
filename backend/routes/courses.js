// ============================================
// IMPORTACIONES DE DEPENDENCIAS Y MÓDULOS
// ============================================

// Router de Express: permite crear rutas modulares y montarlas
// en la aplicación principal. Este archivo manejará todas las
// peticiones relacionadas con cursos bajo el prefijo /api/courses
import { Router } from 'express';

// Datos de cursos simulados (base de datos en memoria).
// Contiene un array de objetos con información de cada curso.
import courses from '../data/courses.js';

// Middleware de autenticación que verifica el token JWT.
// Protege las rutas que requieren que el usuario esté logueado.
import { authenticateToken } from '../middleware/auth.js';

// ============================================
// CREACIÓN DEL ROUTER
// ============================================
// Se crea una instancia de Router para definir las rutas de cursos.
// Las rutas definidas aquí se combinarán con el prefijo en app.js:
// app.use('/api/courses', courseRoutes);

const router = Router();

// ============================================
// RUTA GET /api/courses
// ============================================
// Endpoint PÚBLICO que devuelve la lista completa de cursos.
// No requiere autenticación, cualquier usuario puede acceder.
// Ideal para mostrar el catálogo de cursos disponibles.

router.get('/', (req, res) => {
  // Responde con un objeto JSON que contiene el array de cursos completo
  res.json({ courses });
});

// ============================================
// RUTA GET /api/courses/my/enrolled
// ============================================
// Endpoint PROTEGIDO que devuelve los cursos en los que el usuario
// autenticado está inscrito.
// El middleware authenticateToken verifica el JWT antes de ejecutar esta función.
// Si el token es válido, req.user contiene los datos del usuario.

router.get('/my/enrolled', authenticateToken, (req, res) => {
  // Extrae el ID del usuario autenticado desde el token decodificado
  // (req.user fue asignado por el middleware authenticateToken)
  const userId = req.user.id;

  // Filtra el array de cursos para obtener solo aquellos donde:
  // 1. Existe la propiedad enrolledStudents (evita error si es undefined)
  // 2. El array enrolledStudents incluye el ID del usuario actual
  //
  // NOTA: Los datos originales de courses.js no tienen enrolledStudents,
  // por lo que esta ruta devolvería un array vacío hasta que el usuario
  // se inscriba en algún curso (la inscripción crea la propiedad).
  const myCourses = courses.filter(
    (c) => c.enrolledStudents && c.enrolledStudents.includes(userId)
  );

  // Responde con los cursos filtrados (puede ser un array vacío)
  res.json({ courses: myCourses });
});

// ============================================
// RUTA GET /api/courses/:id
// ============================================
// Endpoint PÚBLICO que devuelve los detalles de un curso específico.
// :id es un parámetro de ruta dinámico (ej: /api/courses/1, /api/courses/5).
// No requiere autenticación.

router.get('/:id', (req, res) => {
  // req.params.id obtiene el valor del parámetro de la URL como string.
  // Number() lo convierte a número entero para comparar con c.id (que es number).
  // Ejemplo: si la URL es /api/courses/3, req.params.id = "3", Number("3") = 3
  const course = courses.find((c) => c.id === Number(req.params.id));

  // Si no se encuentra el curso con ese ID, responde con error 404 (Not Found)
  // y termina la ejecución con return para no continuar.
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Si el curso existe, lo devuelve en la respuesta JSON
  res.json({ course });
});

// ============================================
// RUTA POST /api/courses/:id/enroll
// ============================================
// Endpoint PROTEGIDO para inscribir al usuario autenticado en un curso.
// Requiere token JWT válido (authenticateToken).
// :id es el ID del curso al que se quiere inscribir.

router.post('/:id/enroll', authenticateToken, (req, res) => {
  // Busca el curso por ID (convierte el parámetro de string a número)
  const course = courses.find((c) => c.id === Number(req.params.id));

  // Si el curso no existe, responde con error 404
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Obtiene el ID del usuario autenticado desde el token
  const userId = req.user.id;

  // ============================================
  // INICIALIZAR ARRAY DE ESTUDIANTES INSCRITOS
  // ============================================
  // Si el curso no tiene la propiedad enrolledStudents (primera inscripción),
  // la crea como un array vacío. Esto evita errores al usar .includes() o .push().
  // NOTA: Los datos originales de courses.js no tienen esta propiedad,
  // por lo que se crea dinámicamente en la primera inscripción.
  
  if (!course.enrolledStudents) {
    course.enrolledStudents = [];
  }

  // ============================================
  // VERIFICAR SI YA ESTÁ INSCRITO
  // ============================================
  // Evita inscripciones duplicadas verificando si el userId ya está
  // en el array de estudiantes inscritos.
  
  if (course.enrolledStudents.includes(userId)) {
    return res.status(400).json({ error: 'Ya estás inscrito en este curso' });
  }

  // ============================================
  // VERIFICAR CUPO DISPONIBLE
  // ============================================
  // Compara la cantidad de inscritos (enrolled) con el máximo permitido (maxStudents).
  // Si el curso está lleno, no permite la inscripción.
  
  if (course.enrolled >= course.maxStudents) {
    return res.status(400).json({ error: 'El curso está lleno' });
  }

  // ============================================
  // REALIZAR LA INSCRIPCIÓN
  // ============================================
  // 1. Incrementa el contador de inscritos (enrolled)
  // 2. Agrega el userId al array de estudiantes inscritos
  
  course.enrolled++;
  course.enrolledStudents.push(userId);

  // Responde con mensaje de éxito y los datos actualizados del curso
  res.json({ message: 'Inscripción exitosa', course });
});

// ============================================
// RUTA DELETE /api/courses/:id/enroll
// ============================================
// Endpoint PROTEGIDO para cancelar la inscripción del usuario
// autenticado en un curso específico.
// Requiere token JWT válido (authenticateToken).

router.delete('/:id/enroll', authenticateToken, (req, res) => {
  // Busca el curso por ID (convierte de string a número)
  const course = courses.find((c) => c.id === Number(req.params.id));

  // Si el curso no existe, responde con error 404
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Obtiene el ID del usuario autenticado
  const userId = req.user.id;

  // ============================================
  // VERIFICAR SI ESTÁ INSCRITO
  // ============================================
  // Verifica que:
  // 1. Exista la propiedad enrolledStudents (podría no existir si nadie se inscribió)
  // 2. El userId esté incluido en el array de inscritos
  //
  // Si no cumple alguna condición, responde con error 400 (Bad Request).
  
  if (!course.enrolledStudents || !course.enrolledStudents.includes(userId)) {
    return res.status(400).json({ error: 'No estás inscrito en este curso' });
  }

  // ============================================
  // CANCELAR LA INSCRIPCIÓN
  // ============================================
  // 1. Decrementa el contador de inscritos (enrolled)
  // 2. Filtra el array enrolledStudents eliminando el userId del usuario
  //    (crea un nuevo array sin el ID del usuario que se da de baja)
  
  course.enrolled--;
  course.enrolledStudents = course.enrolledStudents.filter((id) => id !== userId);

  // Responde con mensaje de éxito y los datos actualizados del curso
  res.json({ message: 'Inscripción cancelada', course });
});

// ============================================
// EXPORTACIÓN DEL ROUTER
// ============================================
// Exporta el router para ser importado y montado en la aplicación principal.
// Ejemplo de uso en app.js:
// import courseRoutes from './routes/courses.js';
// app.use('/api/courses', courseRoutes);

export default router;