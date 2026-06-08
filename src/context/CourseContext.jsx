import { createContext, useContext, useState, useEffect, useCallback } from "react";
import coursesData from "../data/courses";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [enrolledIds, setEnrolledIds] = useState(() => {
    const saved = localStorage.getItem("enrolledCourses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  const addCourse = useCallback((courseId) => {
    setEnrolledIds((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  }, []);

  const removeCourse = useCallback((courseId) => {
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
  }, []);

  const isEnrolled = useCallback((courseId) => {
    return enrolledIds.includes(courseId);
  }, [enrolledIds]);

  const enrolledCourses = coursesData.filter((course) =>
    enrolledIds.includes(course.id)
  );

  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  const value = {
    enrolledIds,
    enrolledCourses,
    totalCredits,
    addCourse,
    removeCourse,
    isEnrolled,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses debe usarse dentro de un CourseProvider");
  }
  return context;
}

export default CourseContext;
