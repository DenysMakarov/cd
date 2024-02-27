const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        comment: 'Unique identifier for the role',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Name of the role (e.g., admin, user, editor)',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Description of what the role entails',
    },
    // Additional fields like permissions can be added here
    // permissions: DataTypes.JSON, // For example, if storing permissions as JSON

}, {
    // Model options go here
});
// Role.belongsToMany(User, { through: 'UserRole' });

module.exports = Role;
