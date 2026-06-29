import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('estudiante@isil.pe');
  const [password, setPassword] = useState('123456');
  const { login, isAuthenticated, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      // error manejado en el contexto
    }
  };

  return (
    <div className="page page-login">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">📘</span>
          <h1>Portal del Estudiante</h1>
          <p>Inicia sesión para gestionar tus cursos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              className="form-input"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={loading} className="login-btn">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
          <Button to="/" variant="secondary" size="lg">
            Volver
          </Button>

          <p className="login-hint">
            Demo: estudiante@isil.pe / 123456
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
