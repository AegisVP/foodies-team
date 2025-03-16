export const handleErrors = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || (status === 404 ? 'Not found' : status === 500 ? 'Server Error' : 'General Error');
    res.status(status).json({ message });
};
