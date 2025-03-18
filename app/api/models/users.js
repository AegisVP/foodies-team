import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const User = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(255),
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        timestamps: false,
    }
);

User.sync({ alter: true });
