const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://nihar:Kishu@cluster0.8wm4fmy.mongodb.net/company?retryWrites=true&w=majority");
module.exports = {connection};