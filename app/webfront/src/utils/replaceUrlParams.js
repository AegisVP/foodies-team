export const replaceUrlParams = (url, params) => {
    return url.replace(/:(\w+)/g, (_, key) => encodeURIComponent(params[key] !== undefined ? params[key] : ''));
};
