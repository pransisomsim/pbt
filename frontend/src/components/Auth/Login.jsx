import { useState } from 'react';
import AuthService from '../../services/authServices';
import { useNavigate } from 'react-router-dom';


function Login({ onNavigate }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            alert('Login successful!');
            navigate('/Dashboard')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-2xl p-10 px-8 w-full max-w-[420px] shadow-lg animate-[cardIn_0.3s_ease]">

                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-[#1a1a2e] rounded-xl flex items-center justify-center mx-auto mb-5">
                        <span className="text-2xl text-[#e2c97e] font-bold">₱</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#0f0f1a] mb-1 -tracking-[0.02em]">Welcome back</h1>
                    <p className="text-sm text-gray-500">Sign in to your finance tracker</p>
                </div>

                <form className="flex flex-col gap-[1.1rem]" onSubmit={handleSubmit}>

                    {error && (
                        <div className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                            <span className="flex items-center justify-center w-[18px] h-[18px] min-w-[18px] bg-red-600 text-white rounded-full text-xs font-bold">!</span>
                            {error}
                        </div>
                    )}

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
                        <label className="text-sm font-semibold text-gray-700 tracking-wide" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="py-2.5 px-3.5 border-[1.5px] border-gray-200 rounded-lg text-[0.95rem] text-gray-900 bg-gray-50 outline-none transition-all duration-200 w-full placeholder:text-gray-400 focus:border-[#1a1a2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,26,46,0.08)]"
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
                        className="mt-2 py-3 px-4 bg-[#1a1a2e] text-white border-none rounded-lg text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center min-h-[46px] w-full tracking-wide hover:bg-[#2d2d4e] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Sign In'}
                    </button>

                </form>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Don't have an account?{' '}
                    <button className="bg-transparent border-none text-[#1a1a2e] font-semibold cursor-pointer text-sm p-0 underline underline-offset-2 hover:text-indigo-600" onClick={() => onNavigate('register')}>
                        Create one
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;
