const app = require('./app');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
dotenv.config({ path: './backend/configs/config.env' });
const port = process.env.PORT || 8000;

// Uncaught Error Handler
process.on('uncaughtException', (err) => {
    console.log({ error: err.message, message: "Server Shutdown due to Uncaught error" });
    process.exit(1);
})

// Database Connection
connectDB();

// cloudinary setup configs 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const server = app.listen(port, () => {
    console.log("Listening to the port " + port);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log("Error: " + err.message);
    console.log("Closing the server due to unhandledPromiseRejection");

    server.close(() => {
        process.exit(1);
    })
})