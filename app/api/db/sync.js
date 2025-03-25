const syncCondition = { alter: true, force: false };
const doSync = false;

import { User, Follow } from '../models/users.js';

import { Ingredient } from '../models/ingredients.js';

import { Area } from '../models/areas.js';

import { Category } from '../models/categories.js';

import { Recipe } from '../models/recipes.js';
// Recipe.belongsTo(User, { foreignKey: 'owner', targetKey: 'id', as: 'user' });
User.hasMany(Recipe, { foreignKey: 'owner', sourceKey: 'id' });
Recipe.belongsTo(Category, { foreignKey: 'category', targetKey: 'id', as: 'category_association' });
Recipe.belongsTo(Area, { foreignKey: 'area', targetKey: 'id', as: 'area_association' });

import { Testimonial } from '../models/testimonials.js';
Testimonial.belongsTo(User, { foreignKey: 'owner', targetKey: 'id' });

import { FavoriteRecipe } from '../models/favoriteRecipes.js';

if (doSync) {
    User.sync(syncCondition);
    Follow.sync(syncCondition);
    Ingredient.sync(syncCondition);
    Area.sync(syncCondition);
    Category.sync(syncCondition);
    Recipe.sync(syncCondition);
    Testimonial.sync(syncCondition);
    FavoriteRecipe.sync(syncCondition);
}
