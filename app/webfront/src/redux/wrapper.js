export default (f, r) => async d => {
    try {
        return await f(d);
    } catch ({ message }) {
        return r(message);
    }
};
