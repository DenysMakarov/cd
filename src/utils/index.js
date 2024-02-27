const {User, Role} = require("../models");

const beforeAfter = async () => {
    try {
        await User.destroy({truncate: true, cascade: true})

        const roles = [
            {name: 'admin', description: 'Administrator with full access'},
            {name: 'user', description: 'Standard user with limited access'},
            {name: 'editor', description: 'User who can edit content'},
        ];

        const users = [
            {name: 'John', email: 'John@example.com', password: 'hashed_password1', Roles: [{name: 'admin'}, {name: 'user'}]},
            {name: 'Tor', email: 'Tor@example.com', password: 'hashed_password2', Roles: [{name: 'user'}]},
            {name: 'Hulk', email: 'Hulk@example.com', password: 'hashed_password3', Roles: [{name: 'user'}]},
            {name: 'Frodo', email: 'Frodo@example.com', password: 'hashed_password4', Roles: [{name: 'user'}]},
            {name: 'Jane', email: 'Jane@example.com', password: 'hashed_password5', Roles: [{name: 'user'}]},
        ];

        // Ensure roles do not exist before adding them
        for (const role of roles) {
            await Role.findOrCreate({where: {name: role.name}, defaults: role});
        }

        // Ensure users do not exist before adding them, and assign roles
        for (const user of users) {
            const [userInstance] = await User.findOrCreate({
                where: {email: user.email},
                defaults: {name: user.name, email: user.email, password: user.password},
                include: [{model: Role, as: 'Roles'}]
            });

            // Assign roles to the user
            await Promise.all(
                user.Roles.map(async ({name}) => {
                    const Role = await Role.findOne({where: {name}});
                    if (Role) {
                        await userInstance.addRole(Role);
                    }
                })
            );
        }

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    beforeAfter
}
