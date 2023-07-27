const mongoose = require('mongoose');

const conn_str = "mongodb+srv://tijulukose0402:Tiju123@cluster0.auktjfy.mongodb.net/ecommerceOrders?retryWrites=true&w=majority"

mongoose.connect(conn_str, { useNewUrlParser: true }).then((res) => {
    console.log("Database Connected Successfully")
}).catch((err) => {
    console.log("Error connecting database: " + err)
});

require('./order.model.js');