import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';
import { User } from './users.js';
import { Category } from './categories.js';
import { Area } from './areas.js';

export const Recipe = sequelize.define(
    'recipes',
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
        },
        owner: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        area: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: Area,
                key: 'id',
            },
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        thumb: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        underscored: true,
    }
);
