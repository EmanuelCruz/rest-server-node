const dotenv = require("dotenv")

//valido que el dotenv este creado
const envFound = dotenv.config();
if (!envFound) {
    throw new Error("Couldn't find .env file ")
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    }
}