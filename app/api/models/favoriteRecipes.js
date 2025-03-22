import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';
import { User } from './users.js';
import { Recipe } from './recipes.js';

export const FavoriteRecipe = sequelize.define(
    'favorite_recipes',
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'user_id',
        },
        recipeId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: Recipe,
                key: 'id',
            },
            onDelete: 'CASCADE',
            field: 'recipe_id',
        },
    },
    {
        timestamps: true,
        updatedAt: false,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'recipe_id'],
            },
        ],
    }
);

FavoriteRecipe.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
FavoriteRecipe.belongsTo(Recipe, { foreignKey: 'recipeId', targetKey: 'id' });
Recipe.hasMany(FavoriteRecipe, { foreignKey: 'recipeId', sourceKey: 'id' });
User.hasMany(FavoriteRecipe, { foreignKey: 'userId', sourceKey: 'id' });
