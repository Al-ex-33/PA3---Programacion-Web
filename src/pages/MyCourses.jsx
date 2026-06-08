import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import "../components/CourseCard.css";

function MyCourses() {

    const {
        selectedCourses,
        removeCourse
    } = useContext(CourseContext);

    return (
    <div className="courses-container">

        <h1>Mis Cursos</h1>

        {selectedCourses.length === 0 ? (

        <p>No hay cursos seleccionados.</p>

        ) : (

        selectedCourses.map((course) => (

            <div
            key={course.id}
            className="course-card"
            >

            <div>
                <h3>{course.name}</h3>

                <p>
                Docente: {course.teacher}
                </p>

                <p>
                Créditos: {course.credits}
                </p>
            </div>

            <div>
                <button
                onClick={() => removeCourse(course.id)}
                >
                Eliminar
                </button>
            </div>

            </div>

        ))

        )}

    </div>
    );
    }

export default MyCourses;