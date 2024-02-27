
const User = require('./User');
const Role = require('./role');

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });


module.exports = {
    User,
    Role,
};
