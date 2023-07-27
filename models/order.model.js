const mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    order: { type: String },
    total: { type: String }
});

mongoose.model('Order', OrderSchema);