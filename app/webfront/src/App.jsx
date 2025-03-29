import { SharedLayout, Toaster } from 'src/components';
import AppNavigator from 'src/navigation/AppNavigator';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/authUser/operations';

function App() {
    const dispatch = useDispatch();
    const [customBreadcrumbs, setCustomBreadcrumbs] = useState(null);

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                dispatch(refreshUser());
            }
        })();
    }, [dispatch]);

    return (
        <SharedLayout customBreadcrumbs={customBreadcrumbs}>
            <AppNavigator setCustomBreadcrumbs={setCustomBreadcrumbs} />
            <Toaster />
        </SharedLayout>
    );
}

export default App;
