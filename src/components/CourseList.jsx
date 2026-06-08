import CourseCard from "./CourseCard";

function CourseList({ courses, emptyMessage = "No hay cursos disponibles." }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="course-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default CourseList;
