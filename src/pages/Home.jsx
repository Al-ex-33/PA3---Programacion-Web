import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">

        <div className="hero">

            <h1>Portal del Estudiante</h1>

            <p>
            Gestiona tus cursos e inscripciones
            de manera rápida y sencilla.
            </p>

            <Link to="/courses">
            <button className="hero-button">
                Explorar Cursos
            </button>
            </Link>

        </div>

        </div>
    );
}

export default Home;