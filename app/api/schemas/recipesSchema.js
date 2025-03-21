import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Recipe title is required',
    'any.required': 'Recipe title is required'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category ID is required',
    'any.required': 'Category ID is required'
  }),
  area: Joi.string().required().messages({
    'string.empty': 'Area ID is required',
    'any.required': 'Area ID is required'
  }),
  instructions: Joi.string().required().messages({
    'string.empty': 'Instructions are required',
    'any.required': 'Instructions are required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  thumb: Joi.string().required().messages({
    'string.empty': 'Thumbnail URL is required',
    'any.required': 'Thumbnail URL is required'
  }),
  time: Joi.string().required().messages({
    'string.empty': 'Cooking time is required',
    'any.required': 'Cooking time is required'
  }),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.alternatives().try(
        Joi.string().required(),
        Joi.number().required()
      ).messages({
        'any.required': 'Ingredient ID is required'
      }),
      quantity: Joi.string().required().messages({
        'string.empty': 'Ingredient quantity is required',
        'any.required': 'Ingredient quantity is required'
      })
    })
  ).min(1).required().messages({
    'array.min': 'At least one ingredient is required',
    'any.required': 'Ingredients are required'
  })
});