const mongoose=require("mongoose")

const userSchema=mongoose.Schema({

},{
    versionKey:false
})

const User=mongoose.model()