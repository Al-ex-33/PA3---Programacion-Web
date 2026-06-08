import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }) {

    const { addCourse } = useContext(CourseContext);

    return (
        <div className="course-card">

    <div>
        <h3>{course.name}</h3>

        <p>Créditos: {course.credits}</p>

        <p>Docente: {course.teacher}</p>
    </div>

    <div>
        <button onClick={() => addCourse(course)}>
        Agregar Curso
        </button>

        <Link to={`/course/${course.id}`}>
        <button>Ver Detalle</button>
        </Link>
    </div>

    </div>
    );
}

export default CourseCard;