const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/ecommerceOrders', { useNewUrlParser: true }).then((res) => {
    console.log("Database Connected Successfully")
}).catch((err) => {
    console.log("Error connecting database: " + err)
});

require('./order.model.js');