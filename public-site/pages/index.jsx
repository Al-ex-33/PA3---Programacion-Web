import Link from "next/link";
import Head from "next/head";

export default function Home({ courses }) {
  return (
    <>
      <Head>
        <title>Oferta Académica - ISIL</title>
        <meta name="description" content="Explora nuestra oferta de cursos" />
      </Head>

      <div className="public-home">
        <header className="public-header">
          <div className="public-nav">
            <div className="public-logo">
              <span>📘</span> ISIL - Oferta Académica
            </div>
          </div>
        </header>

        <section className="public-hero">
          <h1>Descubre Nuestra Oferta Académica</h1>
          <p>Cursos de tecnología, gestión, humanidades e idiomas. Docentes expertos, enfoque práctico y orientación profesional.</p>
        </section>

        <section className="public-courses">
          <h2>Cursos Disponibles ({courses.length})</h2>
          <div className="public-course-grid">
            {courses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="public-course-card">
                <div className="public-course-img">
                  <img src={course.image} alt={course.title} />
                  <span className={`course-level-tag level-${course.level?.toLowerCase()}`}>{course.level}</span>
                </div>
                <div className="public-course-body">
                  <span className="public-course-category">{course.category}</span>
                  <h3>{course.title}</h3>
                  <p className="public-course-prof">👨‍🏫 {course.instructor}</p>
                  <div className="public-course-meta">
                    <span>📚 {course.credits} créditos</span>
                    <span>👥 {course.enrolled}/{course.maxStudents} cupos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="public-footer">
          <p>&copy; {new Date().getFullYear()} Instituto San Ignacio de Loyola - Oferta Académica</p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/courses`);
    const data = await res.json();
    return { props: { courses: data.courses }, revalidate: 60 };
  } catch {
    return { props: { courses: [] } };
  }
}
