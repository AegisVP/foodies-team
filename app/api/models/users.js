import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const User = sequelize.define(
    'users',
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
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
    {
        timestamps: false,
    }
);

export const Follow = sequelize.define(
    'follows',
    {
        followerId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        followingId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        timestamps: false,
        primaryKey: ['followerId', 'followingId'], // Composite primary key to prevent duplicates
    }
);

User.belongsToMany(User, {
    through: Follow,
    as: 'followers', // Users that follow this user
    foreignKey: 'followingId',
    otherKey: 'followerId',
});

User.belongsToMany(User, {
    through: Follow,
    as: 'following', // Users that this user follows
    foreignKey: 'followerId',
    otherKey: 'followingId',
});
