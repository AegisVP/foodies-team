import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Area = sequelize.define(
    'areas',
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
    },
    {
        timestamps: false,
    }
);
