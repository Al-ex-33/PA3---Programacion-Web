import Head from "next/head";
import Link from "next/link";

export default function CourseDetail({ course }) {
  if (!course) {
    return (
      <div className="public-detail">
        <Link href="/" className="public-back">← Volver al catálogo</Link>
        <h1>Curso no encontrado</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{course.title} - ISIL</title>
        <meta name="description" content={course.description} />
      </Head>

      <div className="public-detail">
        <Link href="/" className="public-back">← Volver al catálogo</Link>

        <div className="public-detail-content">
          <div className="public-detail-img">
            <img src={course.image} alt={course.title} />
          </div>
          <div className="public-detail-info">
            <span className="public-course-category">{course.category}</span>
            <h1>{course.title}</h1>
            <div className="public-detail-grid">
              <div><strong>Profesor:</strong> {course.instructor}</div>
              <div><strong>Créditos:</strong> {course.credits}</div>
              <div><strong>Horario:</strong> {course.schedule}</div>
              <div><strong>Nivel:</strong> {course.level}</div>
              <div><strong>Cupos:</strong> {course.enrolled}/{course.maxStudents}</div>
            </div>
            <div className="public-detail-desc">
              <h2>Descripción</h2>
              <p>{course.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/courses`);
    const data = await res.json();
    const paths = data.courses.map((c) => ({ params: { id: String(c.id) } }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const apiUrl = process.env.API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/courses/${params.id}`);
    const data = await res.json();
    return { props: { course: data.course }, revalidate: 60 };
  } catch {
    return { props: { course: null } };
  }
}
