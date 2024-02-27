const {User, Role} = require("../models");
const {Sequelize} = require("sequelize");

module.exports = {
    findAllUsers: async () => {
            return await User.findAll({
                include: [{
                    model: Role,
                    as: "Roles",
                    attributes: ["name"],
                    through: {attributes: []}
                }],
                order: [
                    ['name', 'ASC']
                ]
            });
    },

    findUserByName: async (name) => {
        return await User.findOne({
            where: {
                name: {
                    [Sequelize.Op.iLike]: name // Case-insensitive search
                }
            },
            include: [{
                model: Role,
                as: "Roles",
                attributes: ["name"],
                through: {attributes: []}
            }],
        });
    }
}
