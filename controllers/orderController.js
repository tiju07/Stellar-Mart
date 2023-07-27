const express = require("express");
const mongoose = require('mongoose');
const Order = mongoose.model("Order");

var router = express.Router();

router.get("/", (req, res) => {
    res.render('menu');
});

router.get("/cart", (req, res) => {
    res.render('cart');
});


router.get("/orders", (req, res) => {
    res.render('orders');
});


router.get("/admin", (req, res) => {
    Order.find({}).lean().then((resp) => {
        console.log(resp)
        res.render('admin', { order: resp });
    }).catch((err) => {
        console.log("Error in order: " + err)
    })
});

router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id.toString()).lean().then((resp) => {
        res.render('orders', { order: resp });
    }).catch((err) => {
        console.log("Error in findById: " + err)
    })
});

router.get("/order/delete/:id", (req, res) => {
    Order.findByIdAndRemove(req.params.id.toString()).then(() => {
        res.redirect("/admin");
    }).catch((err) => {
        console.log("Error in delete: " + err);
    })
});

// POST

router.post('/cart', (req, res) => {
    insertOrder(req, res);
});

router.post('/order', (req, res) => {
    updateOrder(req, res);
});

// Functions

function updateOrder(req, res) {
    Order.findByIdAndUpdate({ _id: req.body._id.toString() }, req.body, { new: true }).then(() => {
        res.redirect('/admin');
    }).catch((err) => {
        console.log("Error updating order: " + err);
    })
}

function insertOrder(req, res) {
    var d = new Date();
    var t = d.getTime();
    var counter = t;
    counter += 1;
    var order = new Order();
    order.total = req.body.total;
    order.order = counter;
    order.save()

    Order.find({}).lean().then((resp) => {
        console.log("Inserted order successfully" + resp);
        res.render('admin', { order: resp })
    }).catch((err) => {
        console.log("Error inserting order: " + err);
    })
}


module.exports = router;