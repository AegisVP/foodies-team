import HttpError from '../helpers/HttpError.js';

export const validateBody = schema => (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        throw HttpError(400, error.message);
    }
    next();
};
