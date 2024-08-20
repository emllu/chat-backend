const userModel = require("../models/usermodel");

async function searchUser(request, response) {
    try {
        const { search } = request.body;
        const query = new RegExp(search, "i"); // No need for the third "g" parameter

        // Use the find method directly on the model
        const users = await userModel.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        }).select("-password"); // Exclude password from the results

        return response.status(201).json({
            message: " All Users retrieved successfully",
            data: users,
            success: true
        });
    } catch (error) {
        return response.status(400).json({
            error: error.message || error
        });
    }
}

module.exports = searchUser;
