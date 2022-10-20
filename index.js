const express =  require("express")
const connection = require("./Db/db")
const blogRouter = require("./Routes/blog")

const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use("/blog", blogRouter)

app.get("/", (req,res)=>{
    res.send("Welcome to home page")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, async()=>{
    await connection
    if(connection){
        console.log("db connected")
    }
    console.log(`http://localhost:${PORT}`);
})