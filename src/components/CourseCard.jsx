import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import Button from "./Button";

function CourseCard({ course }) {
  const { isEnrolled, addCourse, removeCourse } = useCourses();
  const enrolled = isEnrolled(course.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (enrolled) {
      removeCourse(course.id);
    } else {
      addCourse(course.id);
    }
  };

  return (
    <div className={`course-card ${enrolled ? "course-card--enrolled" : ""}`}>
      <Link to={`/course/${course.id}`} className="course-card-link">
        <div className="course-card-image">
          <img src={course.image} alt={course.title} loading="lazy" />
          <span className={`course-level level-${course.level.toLowerCase()}`}>
            {course.level}
          </span>
        </div>
        <div className="course-card-body">
          <span className="course-category">{course.category}</span>
          <h3 className="course-title">{course.title}</h3>
          <p className="course-instructor">👨‍🏫 {course.instructor}</p>
          <div className="course-meta">
            <span className="course-credits">📚 {course.credits} créditos</span>
            <span className="course-schedule">🕐 {course.schedule}</span>
          </div>
        </div>
      </Link>
      <div className="course-card-actions">
        <Button
          variant={enrolled ? "danger" : "primary"}
          size="sm"
          onClick={handleToggle}
        >
          {enrolled ? "Quitar" : "Agregar"}
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
