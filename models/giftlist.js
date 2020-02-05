module.exports = function (sequelize, DataTypes) {
  var GiftList = sequelize.define("GiftList", {
    gift_name: DataTypes.STRING,
  });
  return GiftList;
};
