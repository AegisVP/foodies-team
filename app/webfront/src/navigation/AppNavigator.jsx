import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './routes.js';

import { Loader } from 'src/components';
import ProtectedRoute from 'src/components/ProtectedRoute/index.jsx';

const HomePage = lazy(() => import('src/pages/HomePage'));
const UserPage = lazy(() => import('src/pages/UserPage/index.jsx'));
const AddRecipePage = lazy(() => import('src/pages/AddRecipePage'));
const RecipePage = lazy(() => import('src/pages/RecipePage/index.jsx'));
const RecipesPage = lazy(() => import('src/pages/RecipesPage/index.jsx'));
const MyFavoritesPage = lazy(() => import('src/pages/MyFavoritesPage'));
const FollowersPage = lazy(() => import('src/pages/FollowersPage/index.jsx'));
const FolloweesPage = lazy(() => import('src/pages/FolloweesPage/index.jsx'));
const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));

const AppNavigator = ({ setCustomBreadcrumbs }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route
                    path={ROUTES.USER_PAGE}
                    element={
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<RecipesPage />} />
                    <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
                    <Route path={ROUTES.FAVORITES} element={<MyFavoritesPage />} />
                    <Route path={ROUTES.FOLLOWERS} element={<FollowersPage />} />
                    <Route path={ROUTES.FOLLOWING} element={<FolloweesPage />} />
                </Route>
                <Route
                    path={ROUTES.ADD_RECIPE_PAGE}
                    element={
                        <ProtectedRoute>
                            <AddRecipePage />
                        </ProtectedRoute>
                    }
                />
                <Route path={ROUTES.RECIPE_PAGE} element={<RecipePage setCustomBreadcrumbs={setCustomBreadcrumbs} />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppNavigator;
