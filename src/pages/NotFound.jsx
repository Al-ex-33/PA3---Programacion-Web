import Button from "../components/Button";

function NotFound() {
  return (
    <div className="page page-notfound">
      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1>Página no encontrada</h1>
        <p>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="notfound-actions">
          <Button to="/" variant="primary" size="lg">
            Ir al Inicio
          </Button>
          <Button to="/courses" variant="outline" size="lg">
            Ver Cursos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
