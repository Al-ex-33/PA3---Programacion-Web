import { NavLink } from "react-router-dom";
import { useCourses } from "../context/CourseContext";

function Navbar() {
  const { enrolledIds } = useCourses();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">📘</span>
          <span className="logo-text">Portal del Estudiante</span>
        </NavLink>
      </div>

      <nav className="navbar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          Cursos
        </NavLink>
        <NavLink
          to="/mycourses"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
        >
          Mis Cursos
          {enrolledIds.length > 0 && (
            <span className="badge">{enrolledIds.length}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
