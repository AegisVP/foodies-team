import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Category = sequelize.define(
    'categories',
    {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);
