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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

export const Followers = sequelize.define('Followers', {
    Followed: {
        type: DataTypes.STRING(36),
        references: {
            model: User,
            key: 'id',
        },
    },
    Follower: {
        type: DataTypes.STRING(36),
        references: {
            model: User,
            key: 'id',
        },
    },
});
User.belongsToMany(User, { through: 'followers', as: 'follower' });
