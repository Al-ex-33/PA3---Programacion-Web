import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import MyCourses from "../pages/MyCourses";
import NotFound from "../pages/NotFound";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/courses"
        element={
          <Layout>
            <Courses />
          </Layout>
        }
      />
      <Route
        path="/course/:id"
        element={
          <Layout>
            <CourseDetail />
          </Layout>
        }
      />
      <Route
        path="/mycourses"
        element={
          <Layout>
            <MyCourses />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
