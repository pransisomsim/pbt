import { useState } from 'react';
import './Auth.css';
import AuthService from '../../services/authServices';

function Register({ onNavigate }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirm) {
            return setError('Passwords do not match');
        }

        if (formData.password.length < 8) {
            return setError('Password must be at least 8 characters');
        }

        setLoading(true);

        try {
            await AuthService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // If we get here, registration was successful
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-success">
                        <div className="success-icon">✓</div>
                        <h2 className="success-title">Account created!</h2>
                        <p className="success-msg">You can now sign in with your credentials.</p>
                        <button className="auth-btn" onClick={() => onNavigate('login')}>
                            Go to Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="logo-icon">₱</span>
                    </div>
                    <h1 className="auth-title">Create account</h1>
                    <p className="auth-subtitle">Start tracking your finances today</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-error">
                            <span className="error-icon">!</span>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full name</label>
                        <input
                            className="form-input"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Juan dela Cruz"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                    </div>

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
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirm">Confirm password</label>
                        <input
                            className={`form-input ${
                                formData.confirm && formData.confirm !== formData.password
                                    ? 'form-input--error'
                                    : ''
                            }`}
                            id="confirm"
                            type="password"
                            name="confirm"
                            placeholder="Repeat your password"
                            value={formData.confirm}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        {formData.confirm && formData.confirm !== formData.password && (
                            <span className="field-error">Passwords do not match</span>
                        )}
                    </div>

                    <button
                        className={`auth-btn ${loading ? 'auth-btn--loading' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="btn-spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <button className="auth-link" onClick={() => onNavigate('login')}>
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;
