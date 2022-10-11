const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    sku: String, // product_id
    aff_link: String,
    name: String,
    image: String,
    desc: String,
    price: Number,
    merchant: String,
    update_time: Date
})

const ProductSchema = mongoose.model('api_products', productSchema)

module.exports = ProductSchema