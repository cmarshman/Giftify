var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var gift = require("../models/gift.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    gift.all(function (data) {
        var hbsObject = {
            gifts: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/gifts", function (req, res) {
    gift.create(["gift_name", "gift_sum", "price"], [req.body.gift_name, req.body.gift_sum, req.body.price], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.delete("/api/gifts/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    gift.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;

