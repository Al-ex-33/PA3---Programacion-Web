import { useEffect, useState } from "react";

import coursesData from "../data/courses";
import CourseList from "../components/CourseList";
import "./Courses.css";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(coursesData);
    }, []);

    return (
        <div className="courses-container">
        <h1>Catálogo de Cursos</h1>

        <CourseList courses={courses} />
        </div>
    );
}

export default Courses;