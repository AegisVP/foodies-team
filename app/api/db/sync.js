const syncCondition = { alter: true, force: false };
const doSync = false;

import { User, Follow } from '../models/users.js';
User.belongsToMany(User, { through: Follow, as: 'followers', foreignKey: 'followeeId', otherKey: 'followerId' });
User.belongsToMany(User, { through: Follow, as: 'followees', foreignKey: 'followerId', otherKey: 'followeeId' });

import { Ingredient } from '../models/ingredients.js';

import { Area } from '../models/areas.js';

import { Category } from '../models/categories.js';

import { Recipe } from '../models/recipes.js';
Recipe.belongsTo(User, { foreignKey: 'owner', targetKey: 'id', as: 'user' });
User.hasMany(Recipe, { foreignKey: 'owner', sourceKey: 'id' });
Recipe.belongsTo(Category, { foreignKey: 'category', targetKey: 'id', as: 'category_association' });
Category.hasMany(Recipe, { foreignKey: 'category', sourceKey: 'id' });
Recipe.belongsTo(Area, { foreignKey: 'area', targetKey: 'id', as: 'area_association' });
Area.hasMany(Recipe, { foreignKey: 'area', sourceKey: 'id' });

import { Testimonial } from '../models/testimonials.js';
Testimonial.belongsTo(User, { foreignKey: 'owner', targetKey: 'id' });
User.hasMany(Testimonial, { foreignKey: 'owner', sourceKey: 'id' });

import { FavoriteRecipe } from '../models/favoriteRecipes.js';
FavoriteRecipe.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(FavoriteRecipe, { foreignKey: 'userId', sourceKey: 'id' });
FavoriteRecipe.belongsTo(Recipe, { foreignKey: 'recipeId', targetKey: 'id' });
Recipe.hasMany(FavoriteRecipe, { foreignKey: 'recipeId', sourceKey: 'id' });

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
