import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(() => {
    const saved = localStorage.getItem("enrolledCourses");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses);
    } catch (err) {
      setError("Error al cargar los cursos desde el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist enrolledIds to localStorage
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  // Cargar cursos al montar
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Enroll via API + local state
  const addCourse = useCallback(async (courseId) => {
    setEnrolledIds((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
    if (isAuthenticated) {
      try {
        await api.post(`/courses/${courseId}/enroll`);
      } catch {
        // Si falla el API, igual mantenemos el estado local
        console.warn("No se pudo inscribir vía API");
      }
    }
  }, [isAuthenticated]);

  // Unenroll via API + local state
  const removeCourse = useCallback(async (courseId) => {
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    if (isAuthenticated) {
      try {
        await api.delete(`/courses/${courseId}/enroll`);
      } catch {
        console.warn("No se pudo cancelar vía API");
      }
    }
  }, [isAuthenticated]);

  const isEnrolled = useCallback(
    (courseId) => enrolledIds.includes(courseId),
    [enrolledIds]
  );

  const enrolledCourses = courses.filter((c) => enrolledIds.includes(c.id));

  const totalCredits = enrolledCourses.reduce(
    (sum, c) => sum + c.credits, 0
  );

  const value = {
    courses,
    enrolledIds,
    enrolledCourses,
    loading,
    error,
    totalCredits,
    addCourse,
    removeCourse,
    isEnrolled,
    fetchCourses,
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
