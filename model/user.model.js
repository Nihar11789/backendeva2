const mongoose = require('mongoose');
const proschema = mongoose.Schema({
    name:String,
    email:String,
    pass : String,
    role: String,
    message:String,
    timeStamp:String
})

const usermodel = mongoose.model("products",proschema);
module.exports = {usermodel};