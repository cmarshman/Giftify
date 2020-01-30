// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var gift = {
  selectAll: function(cb) {
    orm.selectAll("gifts", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insert: function(cols, vals, cb) {
    orm.insert("gifts", cols, vals, function(res) {
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
