function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Instituto San Ignacio de Loyola</h3>
          <p>Formando profesionales para el mundo digital</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@isil.edu.pe</p>
          <p>📞 +51 1 234 5678</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces</h4>
          <p>Términos y condiciones</p>
          <p>Política de privacidad</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} ISIL - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
