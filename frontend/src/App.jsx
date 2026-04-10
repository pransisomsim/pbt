import { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Simple page switcher — replace this with React Router later
function App() {
    const [page, setPage] = useState('login'); // 'login' | 'register' | 'dashboard'

    if (page === 'register') return <Register onNavigate={setPage} />;
    if (page === 'login')    return <Login    onNavigate={setPage} />;

    // placeholder until you build the dashboard
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Dashboard coming soon</h2>
            <button onClick={() => setPage('login')}>Log out</button>
        </div>
    );
}

export default App;

