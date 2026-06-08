import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import coursesData from "../data/courses";
import { useCourses } from "../context/CourseContext";
import Button from "../components/Button";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEnrolled, addCourse, removeCourse, totalCredits } = useCourses();

  const course = coursesData.find((c) => c.id === Number(id));
  const enrolled = course ? isEnrolled(course.id) : false;

  useEffect(() => {
    if (course) {
      document.title = `${course.title} - Portal del Estudiante`;
    } else {
      document.title = "Curso no encontrado - Portal del Estudiante";
    }
    return () => {
      document.title = "Portal del Estudiante";
    };
  }, [course]);

  const handleToggle = () => {
    if (enrolled) {
      removeCourse(course.id);
    } else {
      addCourse(course.id);
    }
  };

  if (!course) {
    return (
      <div className="page page-detail">
        <div className="not-found-card">
          <h1>Curso no encontrado</h1>
          <p>El curso que buscas no existe o ha sido removido.</p>
          <Button to="/courses" variant="primary">
            Volver al Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-detail">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="course-detail">
        <div className="course-detail-image">
          <img src={course.image} alt={course.title} />
        </div>

        <div className="course-detail-info">
          <span className="course-category">{course.category}</span>
          <span className={`course-level level-${course.level.toLowerCase()}`}>
            {course.level}
          </span>

          <h1>{course.title}</h1>

          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Profesor</span>
              <span className="detail-value">{course.instructor}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Créditos</span>
              <span className="detail-value">{course.credits}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Horario</span>
              <span className="detail-value">{course.schedule}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Categoría</span>
              <span className="detail-value">{course.category}</span>
            </div>
          </div>

          <div className="detail-description">
            <h2>Descripción del Curso</h2>
            <p>{course.description}</p>
          </div>

          <div className="detail-actions">
            <Button
              variant={enrolled ? "danger" : "primary"}
              size="lg"
              onClick={handleToggle}
            >
              {enrolled ? "Quitar de Mi Selección" : "Agregar a Mi Selección"}
            </Button>

            {enrolled && (
              <p className="detail-enrolled-info">
                ✅ Este curso está en tu selección. Créditos totales
                acumulados: <strong>{totalCredits}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
