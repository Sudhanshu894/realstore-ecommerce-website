const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "price cannot be greater than 8 digits"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter a category"]
    },
    stock: {
        type: Number,
        required: [true, "please Enter stock of product"],
        maxLength: [4, "Stock cannot be more than 4 digits"],
        default: 1
    },
    numOfreviews: {
        type: Number,
        default: 0,
    },
    reviews: [

        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'users',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            review: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Products', productSchema);