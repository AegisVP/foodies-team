import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';
import { User } from './users.js';

export const Testimonial = sequelize.define(
    'testimonials',
    {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        owner: {
            type: DataTypes.STRING(36),
            allowNull: false,
        },
        testimonial: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);
