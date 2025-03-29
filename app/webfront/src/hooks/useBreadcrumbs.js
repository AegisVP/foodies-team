// src/hooks/useBreadcrumbs.js
import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import ROUTES from 'src/navigation/routes.js';

export const useBreadcrumbs = customBreadcrumbs => {
    const location = useLocation();

    return useMemo(() => {
        // If custom breadcrumbs were provided, use them
        if (customBreadcrumbs) {
            return customBreadcrumbs;
        }

        // Default breadcrumbs based on route
        const breadcrumbs = [{ label: 'Home', path: '/' }];

        // Don't show breadcrumbs on home page
        if (matchPath(ROUTES.HOME, location.pathname)) {
            return [];
        }

        // Categories
        if (matchPath(ROUTES.CATEGORIES, location.pathname)) {
            breadcrumbs.push({ label: 'Categories', path: null });
            return breadcrumbs;
        }

        // Add Recipe Page
        if (matchPath(ROUTES.ADD_RECIPE_PAGE, location.pathname)) {
            breadcrumbs.push({ label: 'Add Recipe', path: null });
            return breadcrumbs;
        }

        // Recipe Page - should be only custom breadcrumbs that have recipe name
        if (matchPath(ROUTES.RECIPE_PAGE, location.pathname)) {
            // const match = matchPath(ROUTES.RECIPE_PAGE, location.pathname);
            // breadcrumbs.push({ label: 'Recipe', path: null });
            // return breadcrumbs;
            return [];
        }

        // User Page and nested routes
        if (matchPath({ path: ROUTES.USER_PAGE, end: false }, location.pathname)) {
            const match = matchPath({ path: ROUTES.USER_PAGE, end: false }, location.pathname);
            breadcrumbs.push({ label: 'Profile', path: `/user/${match.params.id}` });

            return breadcrumbs;
        }

        return breadcrumbs;
    }, [location.pathname, customBreadcrumbs]);
};
