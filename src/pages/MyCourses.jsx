import { useCourses } from "../context/CourseContext";
import CourseList from "../components/CourseList";
import Button from "../components/Button";

function MyCourses() {
  const { enrolledCourses, totalCredits } = useCourses();

  return (
    <div className="page page-mycourses">
      <div className="page-header">
        <h1>Mi Selección de Cursos</h1>
        <p>
          Cursos que has seleccionado para tu preinscripción del ciclo actual.
        </p>
      </div>

      {enrolledCourses.length > 0 && (
        <div className="selection-summary">
          <div className="summary-card">
            <span className="summary-number">{enrolledCourses.length}</span>
            <span className="summary-label">Cursos Seleccionados</span>
          </div>
          <div className="summary-card">
            <span className="summary-number">{totalCredits}</span>
            <span className="summary-label">Créditos Totales</span>
          </div>
        </div>
      )}

      <CourseList
        courses={enrolledCourses}
        emptyMessage={
          <div className="empty-selection">
            <p className="empty-icon">📭</p>
            <h2>No tienes cursos seleccionados</h2>
            <p>
              Explora el catálogo y agrega los cursos que te interesen para tu
              preinscripción.
            </p>
            <Button to="/courses" variant="primary" size="lg">
              Ver Catálogo de Cursos
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default MyCourses;
