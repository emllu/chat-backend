const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected successfully");
        });
        connection.on('error', (error) => {
            console.log("Something went wrong with the database", error);
        });
    } catch (error) {
        console.log("Something happened", error);
    }
}

module.exports = connectDb;
