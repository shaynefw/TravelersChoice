const { Review } = require("../models");

const reviewData = [
  {
    user_id: 1,
    country_id: 1,
    content: "Great!",
    rating: 5,
  },
  {
    user_id: 1,
    country_id: 2,
    content: "Great!",
    rating: 4,
  },
  {
    user_id: 1,
    country_id: 3,
    content: "Good!",
    rating: 1,
  },
  {
    user_id: 2,
    country_id: 1,
    content: "Good!",
    rating: 2,
  },
  {
    user_id: 3,
    country_id: 3,
    content: "Good!",
    rating: 5,
  },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
