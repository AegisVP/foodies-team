const syncCondition = {};

import { User } from '../models/users.js';
User.sync(syncCondition);

import { Area } from '../models/areas.js';
Area.sync(syncCondition);

import { Category } from '../models/categories.js';
Category.sync(syncCondition);

import { Recipe } from '../models/recipes.js';
Ingredient.sync(syncCondition);

import { Testimonial } from '../models/testimonials.js';
Recipe.sync(syncCondition);

import { Ingredient } from '../models/ingredients.js';
Testimonial.sync(syncCondition);
