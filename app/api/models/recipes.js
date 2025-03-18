import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';
import { User } from './users.js';

export const Recipe = sequelize.define(
    'recipes',
    {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
            type: DataTypes.STRING(255),
            allowNull: false,
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

Recipe.belongsTo(User, { foreignKey: 'owner', targetKey: 'id' });

Recipe.sync({ alter: true });
