import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={{ padding: '2rem' }}>Verifying session...</div>;
    }
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;