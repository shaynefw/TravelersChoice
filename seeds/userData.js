const { User } = require("../models");

const userData = [
  {
    username: "user1",
    password: "password",
  },
  {
    username: "user2",
    password: "password",
  },
  {
    username: "user3",
    password: "password",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
