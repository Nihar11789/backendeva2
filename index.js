const express = require("express");
const { connection } = require("./config/db");
const {user_route} = require("./route/user.route");
const {authenticate} = require("./middleware/authenticate");
const {authorize} = require("./middleware/authorize");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
})
app.use("/",user_route)

app.use(authenticate);
app.get("/products", (req, res) => {
    res.send("here are all the products")
})
app.get("/addproducts",authorize(["seller"]),(req, res) => {
    res.send("here seller can add products")
})
app.get("/deleteproducts",authorize(["seller"]),(req, res) =>{
    res.send("here seller can delete products")
})

app.get("/logout",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    const blacklisted_data = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
    blacklisted_data.push(token);
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklisted_data))
    res.send("logout successfull");
})
app.listen(3100,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error);
        console.log("Not connected to db")
    }
    console.log("port is running at 3100");
})