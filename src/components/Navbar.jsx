import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
        <h2>Portal del Estudiante</h2>

        <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/courses">Cursos</Link>
            <Link to="/mycourses">Mis Cursos</Link>
        </div>
        </nav>
    );
}

export default Navbar;