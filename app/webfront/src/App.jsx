import { SharedLayout, Toaster } from 'src/components';
import AppNavigator from 'src/navigation/AppNavigator';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './api/auth';
import { setUser, setIsLoading, logout } from './redux/authUser/slice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    dispatch(setIsLoading(true))
                    const userData = await getCurrentUser();
                    dispatch(setUser(userData));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    console.error('Token invalid or expired:', err);
                    dispatch(logout());
                }
            }
        };
        initAuth();
    }, [dispatch]);

    return (
        <SharedLayout>
            <AppNavigator />
            <Toaster />
        </SharedLayout>
    );
}

export default App;
