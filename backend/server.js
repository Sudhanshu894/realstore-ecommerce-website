const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
dotenv.config({ path: './backend/configs/config.env' });

// Uncaught Error Handler
process.on('uncaughtException', (err) => {
    console.log({ error: err.message, message: "Server Shutdown due to Uncaught error" });
    process.exit(1);
})


// Database Connection
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log("Listening to the port " + process.env.PORT);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log("Error: " + err.message);
    console.log("Closing the server due to unhandledPromiseRejection");

    server.close(() => {
        process.exit(1);
    })
})