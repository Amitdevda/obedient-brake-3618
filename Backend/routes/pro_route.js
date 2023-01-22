const express = require("express");
const { proModel } = require("../models/pro_model.js");


// -----------------------------------------------------------------------------------

const app = express()
app.use(express.json())
const proRouter = express.Router()

proRouter.get("/all", async (req, res) => {
    let query = req.query;
    try {
        const allpro = await proModel.find(query)
        res.send(allpro)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

proRouter.post("/add", async (req, res) => {
    const payload = req.body;
    try {
        const data = await new proModel(payload)
        await data.save()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

proRouter.patch("/edit/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        await proModel.findByIdAndUpdate({ "_id": ID }, payload)
        res.send("Updated")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

proRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await proModel.findByIdAndDelete({ "_id": ID })
        res.send("Deleted")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



module.exports = { proRouter }