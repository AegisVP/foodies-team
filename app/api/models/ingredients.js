import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Ingredient = sequelize.define(
    'ingredients',
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Ingredient.sync({ alter: true });
