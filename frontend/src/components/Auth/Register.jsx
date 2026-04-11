import { useState } from 'react';
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
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white rounded-2xl p-10 px-8 w-full max-w-[420px] shadow-lg animate-[cardIn_0.3s_ease]">
                    <div className="text-center py-4">
                        <div className="w-[60px] h-[60px] bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 font-bold">
                            ✓
                        </div>
                        <h2 className="text-2xl font-bold text-[#0f0f1a] mb-2">Account created!</h2>
                        <p className="text-gray-500 text-sm mb-7">You can now sign in with your credentials.</p>
                        <button className="mt-2 py-3 px-4 bg-[#1a1a2e] text-white border-none rounded-lg text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[46px] w-full tracking-wide hover:bg-[#2d2d4e] active:scale-[0.99]" onClick={() => onNavigate('login')}>
                            Go to Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-2xl p-10 px-8 w-full max-w-[420px] shadow-lg animate-[cardIn_0.3s_ease]">

                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-[#1a1a2e] rounded-xl flex items-center justify-center mx-auto mb-5">
                        <span className="text-2xl text-[#e2c97e] font-bold">₱</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#0f0f1a] mb-1 -tracking-[0.02em]">Create account</h1>
                    <p className="text-sm text-gray-500">Start tracking your finances today</p>
                </div>

                <form className="flex flex-col gap-[1.1rem]" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                            <span className="flex items-center justify-center w-[18px] h-[18px] min-w-[18px] bg-red-600 text-white rounded-full text-xs font-bold">!</span>
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 tracking-wide" htmlFor="name">Full name</label>
                        <input
                            className="py-2.5 px-3.5 border-[1.5px] border-gray-200 rounded-lg text-[0.95rem] text-gray-900 bg-gray-50 outline-none transition-all duration-200 w-full placeholder:text-gray-400 focus:border-[#1a1a2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,26,46,0.08)]"
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

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 tracking-wide" htmlFor="email">Email</label>
                        <input
                            className="py-2.5 px-3.5 border-[1.5px] border-gray-200 rounded-lg text-[0.95rem] text-gray-900 bg-gray-50 outline-none transition-all duration-200 w-full placeholder:text-gray-400 focus:border-[#1a1a2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,26,46,0.08)]"
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

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 tracking-wide" htmlFor="password">Password</label>
                        <input
                            className="py-2.5 px-3.5 border-[1.5px] border-gray-200 rounded-lg text-[0.95rem] text-gray-900 bg-gray-50 outline-none transition-all duration-200 w-full placeholder:text-gray-400 focus:border-[#1a1a2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,26,46,0.08)]"
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

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 tracking-wide" htmlFor="confirm">Confirm password</label>
                        <input
                            className={`py-2.5 px-3.5 border-[1.5px] rounded-lg text-[0.95rem] outline-none transition-all duration-200 w-full placeholder:text-gray-400 focus:bg-white ${
                                formData.confirm && formData.confirm !== formData.password
                                    ? 'border-red-500 bg-red-50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                                    : 'border-gray-200 bg-gray-50 focus:border-[#1a1a2e] focus:shadow-[0_0_0_3px_rgba(26,26,46,0.08)]'
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
                            <span className="text-xs text-red-500 mt-0.5">Passwords do not match</span>
                        )}
                    </div>

                    <button
                        className="mt-2 py-3 px-4 bg-[#1a1a2e] text-white border-none rounded-lg text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[46px] w-full tracking-wide hover:bg-[#2d2d4e] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Already have an account?{' '}
                    <button className="bg-transparent border-none text-[#1a1a2e] font-semibold cursor-pointer text-sm p-0 underline underline-offset-2 hover:text-indigo-600" onClick={() => onNavigate('login')}>
                        Sign in
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;
