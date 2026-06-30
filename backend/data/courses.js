// ============================================
// ARREGLO DE CURSOS DISPONIBLES
// ============================================
// Este archivo exporta un array de objetos que representan los cursos
// ofrecidos en el sistema. Cada curso contiene información completa
// como título, descripción, horario, cupo, etc.

const courses = [
  // ============================================
  // CURSO 1: Automatización con IA
  // ============================================
  {
    id: 1,                                    // Identificador único del curso (número entero)
    title: 'Automatización con IA',           // Nombre del curso que se muestra en la interfaz
    description: 'Automatiza procesos con agentes de IA para proyectos TI', // Breve resumen del contenido
    instructor: 'Prompt Enginering Saulo Baeza', // Nombre del profesor que imparte el curso
    credits: 6,                               // Número de créditos académicos que vale el curso
    schedule: 'Lunes y Miércoles 10:00 - 12:00', // Días y horario de clase
    category: 'IA',                           // Categoría temática para filtrar cursos
    level: 'Intermedio',                      // Nivel de dificultad (Básico, Intermedio, Avanzado)
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUHLSh8MWKeBz46xn3iqf39_QcqKAemq5UKMEuBhTLe7Acs_POTsQuwio&s=10', // URL de la imagen representativa
    enrolled: 10,                             // Cantidad de estudiantes actualmente inscritos
    maxStudents: 20                           // Capacidad máxima de estudiantes permitida
  },

  // ============================================
  // CURSO 2: Programación Web II
  // ============================================
  // Nota: Este curso está COMPLETO (enrolled === maxStudents)
  {
    id: 2,
    title: 'Programación Web II',
    description: 'Construcción de aplicaciones SPA con React. Hooks, React Router, Context API y estado global.',
    instructor: 'Ing. Roberto Castillo',
    credits: 5,
    schedule: 'Lunes y Miércoles 14:00 - 16:00',
    category: 'Tecnología',
    level: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    enrolled: 30,
    maxStudents: 30                           // Cupo lleno - no se permiten más inscripciones
  },

  // ============================================
  // CURSO 3: Base de Datos
  // ============================================
  {
    id: 3,
    title: 'Base de Datos',
    description: 'Diseño, implementación y consulta de bases de datos relacionales con SQL.',
    instructor: 'Ing. Ana Lucía Torres',
    credits: 4,
    schedule: 'Martes y Jueves 16:00 - 18:00',
    category: 'Tecnología',
    level: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
    enrolled: 12,
    maxStudents: 20
  },

  // ============================================
  // CURSO 4: Python / Django
  // ============================================
  {
    id: 4,
    title: 'Python / Django',
    description: 'Desarrollo backend usando el lenguaje de programación Python con el framework Django',
    instructor: 'Ing. Alexandra Becerra',
    credits: 4,
    schedule: 'Lunes y Miércoles 10:00 - 12:00',
    category: 'Tecnología',
    level: 'Avanzado',
    image: 'https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    enrolled: 10,
    maxStudents: 20
  },

  // ============================================
  // CURSO 5: Inglés Técnico
  // ============================================
  // Único curso en la categoría 'Idiomas'
  {
    id: 5,
    title: 'Inglés Técnico',
    description: 'Inglés orientado a la industria tecnológica.',
    instructor: 'Lic. James Anderson',
    credits: 3,
    schedule: 'Lunes y Viernes 07:00 - 08:30',
    category: 'Idiomas',                      // Categoría diferente a la mayoría (no es Tecnología)
    level: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop',
    enrolled: 10,
    maxStudents: 20
  },

  // ============================================
  // CURSO 6: Introducción a la Programación
  // ============================================
  // Curso de nivel Básico para principiantes
  {
    id: 6,
    title: 'Introducción a la Programación',
    description: 'Fundamentos de la programación estructurada usando Python.',
    instructor: 'Ing. Carlos Méndez',
    credits: 4,
    schedule: 'Lunes y Miércoles 08:00 - 10:00',
    category: 'Tecnología',
    level: 'Básico',                          // Nivel inicial para nuevos estudiantes
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    enrolled: 22,
    maxStudents: 30
  },

  // ============================================
  // CURSO 7: Programación Web I
  // ============================================
  // Prerrequisito de Programación Web II (id: 2)
  {
    id: 7,
    title: 'Programación Web I',
    description: 'Desarrollo de sitios web estáticos y dinámicos con HTML5, CSS3 y JavaScript.',
    instructor: 'Ing. María Fernández',
    credits: 5,
    schedule: 'Martes y Jueves 10:00 - 12:00',
    category: 'Tecnología',
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    enrolled: 18,
    maxStudents: 25
  },

  // ============================================
  // CURSO 8: Metodologías Ágiles
  // ============================================
  // Único curso en la categoría 'Gestión'
  {
    id: 8,
    title: 'Metodologías Ágiles',
    description: 'Aplicación de Scrum, Kanban y XP en proyectos de software.',
    instructor: 'Ing. Diego Palacios',
    credits: 3,
    schedule: 'Viernes 08:00 - 12:00',          // Solo un día a la semana (viernes)
    category: 'Gestión',                      // Categoría de administración de proyectos
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    enrolled: 15,
    maxStudents: 25
  },

  // ============================================
  // CURSO 9: Desarrollo de APIs REST
  // ============================================
  // Curso con menor número de inscritos (8)
  {
    id: 9,
    title: 'Desarrollo de APIs REST',
    description: 'Creación de servicios web RESTful con Node.js y Express. JWT, Swagger, despliegue.',
    instructor: 'Ing. Sofía Ramírez',
    credits: 5,
    schedule: 'Miércoles y Viernes 14:00 - 16:00',
    category: 'Tecnología',
    level: 'Avanzado',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    enrolled: 8,                              // Menor cantidad de inscritos - cupos disponibles
    maxStudents: 20
  },

  // ============================================
  // CURSO 10: Ética Profesional
  // ============================================
  // Único curso en la categoría 'Humanidades'
  {
    id: 10,
    title: 'Ética Profesional',
    description: 'Principios éticos aplicados al ejercicio profesional.',
    instructor: 'Lic. Patricia Gómez',
    credits: 2,                               // Menor cantidad de créditos
    schedule: 'Sábado 09:00 - 11:00',          // Único curso los sábados
    category: 'Humanidades',                  // Categoría de formación general
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop',
    enrolled: 25,
    maxStudents: 35                           // Mayor capacidad de todos los cursos
  }
];

// ============================================
// EXPORTACIÓN DEL MÓDULO
// ============================================
// Exporta el array 'courses' como exportación por defecto,
// permitiendo importarlo en otros archivos con:
// import courses from './ruta/al/archivo';

export default courses;