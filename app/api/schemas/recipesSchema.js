import Joi from 'joi';

export const createRecipeSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Recipe title is required',
        'any.required': 'Recipe title is required',
    }),
    category: Joi.string().required().messages({
        'string.empty': 'Category ID is required',
        'any.required': 'Category ID is required',
    }),
    area: Joi.string().required().messages({
        'string.empty': 'Area ID is required',
        'any.required': 'Area ID is required',
    }),
    instructions: Joi.string().required().messages({
        'string.empty': 'Instructions are required',
        'any.required': 'Instructions are required',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
    }),
    thumb: Joi.string()
        .pattern(/^data:image\/(png|jpeg|jpg|gif|webp);base64,.+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid Base64 image format. It should start with "data:image/{format};base64,"',
            'string.empty': 'Thumb (Base64 string) is required.',
        }),
    time: Joi.string().required().messages({
        'string.empty': 'Cooking time is required',
        'any.required': 'Cooking time is required',
    }),
    ingredients: Joi.array()
        .items(
            Joi.object({
                id: Joi.alternatives().try(Joi.string().required(), Joi.number().required()).messages({
                    'any.required': 'Ingredient ID is required',
                }),
                measure: Joi.string().required().messages({
                    'string.empty': 'Ingredient measure is required',
                    'any.required': 'Ingredient measure is required',
                }),
            })
        )
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one ingredient is required',
            'any.required': 'Ingredients are required',
        }),
});
