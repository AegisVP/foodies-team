import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ROUTES from 'src/navigation/routes';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(state => state.authUser.isAuthenticated);

    return isAuthenticated ? children : <Navigate to={ROUTES.PROTECTED_REDIRECT} replace />;
}
