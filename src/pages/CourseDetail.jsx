import { useParams } from "react-router-dom";
import courses from "../data/courses";
import "./CourseDetail.css";

function CourseDetail() {

    const { id } = useParams();

    const course = courses.find(
        c => c.id === Number(id)
    );

    if (!course) {
        return <h2>Curso no encontrado</h2>;
    }

    return (
        <div className="detail-container">
        <h1>{course.name}</h1>

        <p>
            Créditos: {course.credits}
        </p>

        <p>
            Docente: {course.teacher}
        </p>

        <p>
            {course.description}
        </p>
        </div>
    );
}

export default CourseDetail;