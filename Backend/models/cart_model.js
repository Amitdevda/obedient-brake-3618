const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    image: String,
    title: String,
    category: String,
    price: Number,
    userID: String
}, {
    versionKey: false
})

const cartModel = mongoose.model("cart", cartSchema)

module.exports = { cartModel }