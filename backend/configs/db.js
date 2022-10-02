const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.CONNECT_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`MongoDB connected with the server: ${data.connection.host}`);
    })
}


module.exports = connectDB