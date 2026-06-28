import { NavLink, useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { enrolledIds } = useCourses();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">📘</span>
          <span className="logo-text">Portal del Estudiante</span>
        </NavLink>
      </div>

      <nav className="navbar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
          Inicio
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
          Cursos
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/mycourses" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
            Mis Cursos
            {enrolledIds.length > 0 && <span className="badge">{enrolledIds.length}</span>}
          </NavLink>
        )}

        {isAuthenticated ? (
          <div className="navbar-user">
            <span className="navbar-user-name">{user?.name?.split(" ")[0]}</span>
            <button onClick={handleLogout} className="nav-link nav-link-logout">
              Salir
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
            Iniciar Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
