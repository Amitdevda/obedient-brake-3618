const express= require("express")
const userouter= require("")
const {connection}=require("")
app=express()
app.use(express.json())

app.use("users",userouter)


app.listen(4500,async()=>{
       try {
         await connection
       } catch (error) {
        console.log(error)
       }
})
