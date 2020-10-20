const mongoose = require('mongoose')
const schema = mongoose.Schema


const productSchema = mongoose.Schema({
    writer: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    images: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    continent: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }

})

const Product = mongoose.model('Product', productSchema)
module.exports ={Product} 