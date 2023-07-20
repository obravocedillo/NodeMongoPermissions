const mongoose = require("mongoose");

// Users shcema
const UsersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        /**
         *  Array with all the permissions, default value will false in case new 
         *  permissions are added
         */
        permissions: {
            getData: { type: Boolean, default: false }
        },
    }
);

// Dont allow repeated usernames
UsersSchema.index({ username: 1 }, { unique: true });

// Create mongoose model and set the collection name to Users
const Users = mongoose.model("Users", UsersSchema, "Users");

// Export created model
module.exports = Users;
