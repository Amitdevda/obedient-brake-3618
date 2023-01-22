const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { userModel } = require("../models/signup_model.js");

const userRouter = express.Router()


userRouter.get("/", async (req, res) => {
    const data = await userModel.find();
    res.send(data)
})

userRouter.post("/signup", async (req, res) => {
    const { name, age, email, password } = req.body;
    try {
        bcrypt.hash(password, 3, async (err, hashed) => {
            const data = new userModel({ name, age, email, password: hashed });
            await data.save();
            res.send(data)
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "masai");
                    res.send({
                        "msg": "login Sucessfull",
                        "user": user[0]._id,
                        "name": user[0].name,
                        "token": token
                    })
                } else {
                    res.send("Wrong Credentials")
                }
            })
        } else {
            res.send("Can not find account Please Sign-up first")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = {userRouter}