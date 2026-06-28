import { useState } from "react";
import { useCourses } from "../context/CourseContext";
import CourseList from "../components/CourseList";

function Courses() {
  const { courses, loading, error } = useCourses();
  const [filter, setFilter] = useState("Todos");
  const [levelFilter, setLevelFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const categories = ["Todos", ...new Set(courses.map((c) => c.category))];
  const levels = ["Todos", ...new Set(courses.map((c) => c.level))];

  const filteredCourses = courses.filter((course) => {
    const matchCategory = filter === "Todos" || course.category === filter;
    const matchLevel = levelFilter === "Todos" || course.level === levelFilter;
    const matchSearch =
      search.trim() === "" ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  if (loading) {
    return (
      <div className="page page-courses">
        <div className="page-header"><h1>Catálogo de Cursos</h1></div>
        <div className="loading-state">Cargando cursos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page-courses">
        <div className="page-header"><h1>Catálogo de Cursos</h1></div>
        <div className="error-state">
          <p>{error}</p>
          <button className="btn btn-primary btn-md" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-courses">
      <div className="page-header">
        <h1>Catálogo de Cursos</h1>
        <p>Explora todos los cursos disponibles. Filtra por categoría, nivel y busca el que más te interese.</p>
      </div>

      <div className="courses-toolbar">
        <div className="search-box">
          <input type="text" placeholder="Buscar por nombre o profesor..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
          {search && <button className="search-clear" onClick={() => setSearch("")} aria-label="Limpiar búsqueda">✕</button>}
        </div>

        <div className="filter-tabs">
          {categories.map((cat) => (
            <button key={cat} className={`filter-tab ${filter === cat ? "filter-tab-active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>

        <div className="filter-tabs">
          {levels.map((lvl) => (
            <button key={lvl} className={`filter-tab ${levelFilter === lvl ? "filter-tab-active" : ""}`} onClick={() => setLevelFilter(lvl)}>{lvl}</button>
          ))}
        </div>
      </div>

      <div className="courses-results">
        <p className="results-count">
          {filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""} encontrado{filteredCourses.length !== 1 ? "s" : ""}
        </p>
      </div>

      <CourseList courses={filteredCourses} emptyMessage="No se encontraron cursos con los filtros seleccionados." />
    </div>
  );
}

export default Courses;
