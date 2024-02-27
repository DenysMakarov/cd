const userService = require("../services/user.service");


module.exports = {

    findAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            next(res.status(500).json({error: error.message}))
        }
    },


    findUserByName: async (req, res, next) => {
        const {name} = req.params;
        try {
            const user = await userService.findUserByName(name);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({message: "User not found"});
        } catch (error) {
            next(res.status(500).json({error: error.message}))
        }
    }

}
