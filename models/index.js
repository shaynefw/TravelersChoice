const User = require("./User");
const Review = require("./Review");
const Country = require("./Country");

// One to Many relationship between User and Post
User.hasMany(Review, {
  foreignKey: "user_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

// One to Many relationship between User and Comment
Country.hasMany(Review, {
  foreignKey: "country_id",
});

Review.belongsTo(Country, {
  foreignKey: "country_id",
});

module.exports = { User, Review, Country };
