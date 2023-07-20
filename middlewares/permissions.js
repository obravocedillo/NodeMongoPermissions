// Import users mongoose model
const UsersModel = require("../models/users");

/**
 * @desc Checks if user has the right roles to access route
 * @param {string[]} module the name of the module
 */
const permissionsMiddleware = (requiredPermissions) => async (req, res, next) => {
    try {
        /**
        *  Information needed to indentify user, in this case we will send the username in
        *  the boddy, but other information can be used for example the _id of the user
        *  obtained from decoding a JWT or a field in the request headers
        */
        let username = req.body.username;

        /**
         * Obtain user information by executing query, we use lean to 
         * skip hydrating the result documents
         */
        const userInformation = await UsersModel.findOne(
            {
                username
            },
        )
            .lean()
            .exec();


        // Move through all the required permissions 
        for (let i = 0; i < requiredPermissions.length; i += 1) {
            if (!userInformation.permissions[requiredPermissions[i]]) {
                /**
                 *  If the user does not have one of the required permissions
                 *  return forbidden error
                 */
                return res.status(403).send("Not enough permissions");
            }
        }

        // If the user has all the required permissions then continue
        next();
    } catch (error) {
        // Return error message
        return res.status(500).send(error);
    }
};

module.exports = {
    permissionsMiddleware
}