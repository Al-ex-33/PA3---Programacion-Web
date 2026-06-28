import { Router } from 'express';
import courses from '../data/courses.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/courses - Listar todos los cursos (publico)
router.get('/', (req, res) => {
  res.json({ courses });
});

// GET /api/courses/:id - Detalle de un curso (publico)
router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }
  res.json({ course });
});

// POST /api/courses/:id/enroll - Inscribirse (protegido)
router.post('/:id/enroll', authenticateToken, (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const userId = req.user.id;
  if (!course.enrolledStudents) {
    course.enrolledStudents = [];
  }

  if (course.enrolledStudents.includes(userId)) {
    return res.status(400).json({ error: 'Ya estás inscrito en este curso' });
  }

  if (course.enrolled >= course.maxStudents) {
    return res.status(400).json({ error: 'El curso está lleno' });
  }

  course.enrolled++;
  course.enrolledStudents.push(userId);
  res.json({ message: 'Inscripción exitosa', course });
});

// DELETE /api/courses/:id/enroll - Cancelar inscripción (protegido)
router.delete('/:id/enroll', authenticateToken, (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const userId = req.user.id;
  if (!course.enrolledStudents || !course.enrolledStudents.includes(userId)) {
    return res.status(400).json({ error: 'No estás inscrito en este curso' });
  }

  course.enrolled--;
  course.enrolledStudents = course.enrolledStudents.filter((id) => id !== userId);
  res.json({ message: 'Inscripción cancelada', course });
});

// GET /api/courses/mine - Cursos del estudiante autenticado (protegido)
router.get('/my/enrolled', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const myCourses = courses.filter(
    (c) => c.enrolledStudents && c.enrolledStudents.includes(userId)
  );
  res.json({ courses: myCourses });
});

export default router;
