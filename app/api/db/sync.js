const syncCondition = { alter: false, force: false };

import { User, Follow } from '../models/users.js';
User.sync(syncCondition);
Follow.sync(syncCondition);

import { Ingredient } from '../models/ingredients.js';
Ingredient.sync(syncCondition);

import { Area } from '../models/areas.js';
Area.sync(syncCondition);

import { Category } from '../models/categories.js';
Category.sync(syncCondition);

import { Recipe } from '../models/recipes.js';
Recipe.sync(syncCondition);
Recipe.belongsTo(User, { foreignKey: 'owner', targetKey: 'id', as: 'user' });
Recipe.belongsTo(Category, { foreignKey: 'category', targetKey: 'id', as: 'category_association' });
Recipe.belongsTo(Area, { foreignKey: 'area', targetKey: 'id', as: 'area_association' });

import { Testimonial } from '../models/testimonials.js';
Testimonial.sync(syncCondition);
Testimonial.belongsTo(User, { foreignKey: 'owner', targetKey: 'id' });

import { FavoriteRecipe } from '../models/favoriteRecipes.js';
FavoriteRecipe.sync(syncCondition);
