export const handleErrors = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || (status === 404 ? 'Not found' : status === 500 ? 'Server Error' : 'General Error');
    const contentType = req.headers['content-type'] ?? 'text/html';
    const messageFormated = contentType === 'text/html' ? message : { message };
    res.status(status).header('Content-Type', contentType).send(messageFormated);
};
