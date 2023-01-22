const express = require("express");
const { cartModel } = require("../models/cart_model.js");

const app = express()
app.use(express.json())
const cartRouter = express.Router()

cartRouter.get("/showcart", async (req, res) => {
    let query = req.query;
    try {
        const allcart = await cartModel.find(query)
        res.send(allcart)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

cartRouter.post("/addcart", async (req, res) => {
    const payload = req.body;
    try {
        const data = await new cartModel(payload)
        await data.save()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

cartRouter.delete("/deletecart/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await cartModel.findByIdAndDelete({ "_id": ID })
        res.send("Deleted")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = { cartRouter }