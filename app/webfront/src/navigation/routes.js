export const ROUTES = {
    HOME: '/',
    PROTECTED_REDIRECT: '/',
    USER_PAGE: '/user/:id?',
    ADD_RECIPE_PAGE: '/recipe/add',
    RECIPE_PAGE: '/recipe/:id',
    CATEGORIES: '/categories',
    RECIPES: 'recipes',
    FAVORITES: 'favorites',
    FOLLOWERS: 'followers',
    FOLLOWING: 'following',
    NOT_FOUND: '*',
    BUILD: (path, query) => {
        if (Array.isArray(path)) {
            path = path.join('/');
        } else if (typeof path === 'string') {
            path = path.trim().slice(path.startsWith('/') ? 1 : 0, path.endsWith('/') ? -1 : undefined);
        }
        let queryArr = [];
        for (const [key, val] in query) {
            queryArr.push(`${key}=${val}`);
        }
        return `/${path}${query ? `?${queryArr.join('&')}` : ''}`;
    },
};

export default ROUTES;
