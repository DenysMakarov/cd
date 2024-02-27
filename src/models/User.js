const sequelize = require('../config');
const { DataTypes } = require('sequelize');

// Assuming RoleModel is another model for user roles
// You would need to define this model as well if it doesn't already exist

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        comment: 'Unique identifier for the user',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Full name of the user',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        comment: 'Email address of the user',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Hashed password of the user',
    },
});



module.exports = User;
