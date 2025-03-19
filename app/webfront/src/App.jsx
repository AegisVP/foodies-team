import { SharedLayout, Toaster } from 'src/components';
import AppNavigator from 'src/navigation/AppNavigator';

function App() {
    return (
        <SharedLayout>
            <AppNavigator />
            <Toaster />
        </SharedLayout>
    );
}

export default App;
