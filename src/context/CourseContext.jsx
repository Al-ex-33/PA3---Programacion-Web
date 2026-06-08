import { createContext, useState } from "react";

export const CourseContext = createContext();

export function CourseProvider({ children }) {

    const [selectedCourses, setSelectedCourses] = useState([]);

    const addCourse = (course) => {
    setSelectedCourses((prev) => {

        const exists = prev.some(
        c => c.id === course.id
        );

        if (exists) {
        return prev;
        }

        return [...prev, course];
    });
};

    const removeCourse = (id) => {
        setSelectedCourses((prev) =>
        prev.filter(course => course.id !== id)
        );
    };

    return (
        <CourseContext.Provider
        value={{
            selectedCourses,
            addCourse,
            removeCourse
        }}
        >
        {children}
        </CourseContext.Provider>
    );
}