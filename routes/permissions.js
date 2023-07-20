const express = require("express");
const permissionsController = require("../controllers/permissions");

const { permissionsMiddleware } = require("../middlewares/permissions");

// Express router 
const router = express.Router();

/**
 * @desc Will save a new user in the database
 * @param {*} req express request
 * @param {*} res espress response
 */
const saveUser = async (req, res) => {
    try {
        let username = req.body.username;

        // If username is not present on the request body then the call is not valid
        if (username) {

            // Call controller logic
            let ceateUserResponse = await permissionsController.saveUser(
                username
            );

            // Return controller response
            return res.status(200).send(ceateUserResponse);
        }

        // Return bad request error 
        res.status(400).send("Error data incomplete");
    } catch (error) {
        console.log(error);
        // Return error message
        res.status(500).send("Error saving new user");
    }
};

/**
 * @desc Will update the permissions of a user
 * @param {*} req express request
 * @param {*} res espress response
 */
const updateUserPermissions = async (req, res) => {
    try {
        let username = req.body.username;
        let permissions = req.body.permissions;

        // If username or permissions are not present on the request body then the call is not valid
        if (username && permissions) {

            // Call controller logic
            let updatePermissionsResponse = await permissionsController.updateUserPermissions(
                username,
                permissions
            );

            // Return controller response
            return res.status(200).send(updatePermissionsResponse);
        }

        // Return bad request error 
        res.status(400).send("Error data incomplete");
    } catch (error) {
        console.log(error);
        // Return error message
        res.status(500).send("Error updating permissions");
    }
};

/**
 * @desc Example of a route only accesible with required permissions
 * @param {*} _req express request
 * @param {*} res espress response
 */
const routeWithPermissions = async (_req, res) => {
    res.status(200).send("Route with permissions");
};

// Route that saves a new user 
router.post(
    "/save-user",
    saveUser
);

// Route that update a user permissions 
router.post(
    "/update-user-permissions",
    updateUserPermissions
);

// Route only accesible with permissions, only accesible if the user has the required permissions 
router.post(
    "/route-with-permissions",
    [permissionsMiddleware(["getData"])],
    routeWithPermissions
);

module.exports = router;