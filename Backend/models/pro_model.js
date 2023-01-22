const mongoose = require("mongoose")

const proSchema = mongoose.Schema({
    image: String,
    title: String,
    category: String,
    price: Number
}, {
    versionKey: false
})

const proModel = mongoose.model("product", proSchema)

module.exports = { proModel }
