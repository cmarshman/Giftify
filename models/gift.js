// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var gift = {
  all: function(cb) {
    orm.all("gifts", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("gifts", cols, vals, function(res) {
      cb(res);
    });
  },
  delete: function(objColVals, condition, cb) {
      orm.delete("gifts", objColVals, condition, function(res) {
          cb(res);
      });
  }
};

// Export the database functions for the controller (gifts_controller.js).
module.exports = gift;
