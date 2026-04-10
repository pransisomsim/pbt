import { useState } from 'react';
import './Auth.css';
import AuthService from '../../services/authServices';

function Login({ onNavigate }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
      try {
            await AuthService.login(formData);
            // onNavigate('dashboard'); // uncomment when you have routing
            alert('Login successful! Token saved.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="logo-icon">₱</span>
                    </div>
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to your finance tracker</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>

                    {error && (
                        <div className="auth-error">
                            <span className="error-icon">!</span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="form-input"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="form-input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        className={`auth-btn ${loading ? 'auth-btn--loading' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="btn-spinner" /> : 'Sign In'}
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <button className="auth-link" onClick={() => onNavigate('register')}>
                        Create one
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;

