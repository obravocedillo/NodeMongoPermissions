// Import users mongoose model
const UsersModel = require("../models/users");

const saveUser = async (username) => {

    /**
     * Creates new user with username from parameter, all permissions will be set to false 
     * because of the default value.
     */
    const newUser = new UsersModel({
        username
    });

    /**
     * If the username includes the word admin then we will set all permissions to true,
     * this is just to display we can change the permissions of the user we create 
     * deppending on specific logic
     */
    if (username.includes('admin')) {
        // Move through all the permissions available and set them to true
        for (const key in newUser.permissions) {
            newUser.permissions[key] = true;
        }
    }

    // Save new user in Mongo
    await newUser.save()

    // Return saved user
    return newUser
}


const updateUserPermissions = async (username, permissions) => {

    // Update permissions from user with passed username
    await UsersModel.updateOne(
        {
            username
        },
        {
            $set: {
                permissions
            }
        }
    )

    /**
      * Obtain user information by executing query, we use lean to 
      * skip hydrating the result documents
      */
    const userInformation = await UsersModel.findOne({ username }).lean().exec()

    // Return user with updated information
    return userInformation
}

module.exports = {
    saveUser,
    updateUserPermissions
}