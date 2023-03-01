const sequelize = require("../config/connection");
const seedCountries = require("./countryData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  try {
    await seedCountries().then(() => {
      console.log("\x1b[32m%s\x1b[0m", "<----- COUNTRIES SEEDED! ----->");
    });
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedAll();
