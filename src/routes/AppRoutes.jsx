import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import MyCourses from "../pages/MyCourses";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;