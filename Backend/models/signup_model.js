const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String
},{
    versionKey : false
})

const userModel = mongoose.model("fp_user",userSchema)

module.exports = {userModel}