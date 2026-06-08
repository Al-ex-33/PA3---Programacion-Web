import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import Button from "../components/Button";

function Home() {
  const { enrolledIds, totalCredits } = useCourses();

  return (
    <div className="page page-home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Portal del <span>Estudiante</span>
          </h1>
          <p className="hero-subtitle">
            Explora la oferta académica, revisa los detalles de cada curso y
            gestiona tu preinscripción de forma rápida y sencilla.
          </p>
          <div className="hero-actions">
            <Button to="/courses" variant="primary" size="lg">
              Ver Catálogo de Cursos
            </Button>
            {enrolledIds.length > 0 && (
              <Button to="/mycourses" variant="outline" size="lg">
                Mis Cursos ({enrolledIds.length})
              </Button>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop"
            alt="Estudiantes en clase"
          />
        </div>
      </section>

      <section className="features-section">
        <h2>¿Qué puedes hacer en el portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Explorar Cursos</h3>
            <p>
              Navega por el catálogo completo de cursos disponibles este ciclo.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <h3>Ver Detalles</h3>
            <p>
              Revisa la descripción, horario, profesor y créditos de cada curso.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Preinscripción</h3>
            <p>
              Agrega o quita cursos de tu selección y revisa el total de
              créditos.
            </p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{enrolledIds.length}</span>
          <span className="stat-label">Cursos Seleccionados</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{totalCredits}</span>
          <span className="stat-label">Créditos Totales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">8</span>
          <span className="stat-label">Cursos Disponibles</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
