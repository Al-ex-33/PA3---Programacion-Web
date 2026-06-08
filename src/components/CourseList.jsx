import CourseCard from "./CourseCard";

function CourseList({ courses }) {
    return (
        <>
        {courses.map((course) => (
            <CourseCard
            key={course.id}
            course={course}
            />
        ))}
        </>
    );
}

export default CourseList;