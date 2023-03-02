const { Country } = require("../models");

const countryData = [
  {
    name: "France",
    description:
      "France is a country in Western Europe with several overseas regions and territories. The metropolitan area of France extends from the Mediterranean Sea to the English Channel and the North Sea, and from the Rhine to the Atlantic Ocean. It is one of the world’s most visited countries, with more than 83 million foreign tourists in 2017. France is a unitary semi-presidential republic with its capital in Paris, the country’s largest city and main cultural and commercial centre. Other major urban areas include Lyon, Marseille, Toulouse, Bordeaux, Lille and Nice.",
    photo: "../images/countries/france/france-img.jpg",
  },
  {
    name: "Spain",
    description:
      "Spain, officially the Kingdom of Spain, is a country in Southwestern Europe with some pockets of territory across the Strait of Gibraltar and the Atlantic Ocean. Its continental European territory is situated on the Iberian Peninsula. Its territory also includes two archipelagos: the Canary Islands off the coast of North Africa, and the Balearic Islands in the Mediterranean Sea. The African enclaves of Ceuta, Melilla, and Peñón de Vélez de la Gomera make Spain the only European country to have a physical border with an African country (Morocco). Several small islands in the Alboran Sea are also part of Spanish territory. The country's mainland is bordered to the south and east by the Mediterranean Sea except for a small land boundary with Gibraltar; to the north and northeast by France, Andorra, and the Bay of Biscay; and to the west and northwest by Portugal and the Atlantic Ocean respectively. ",
    photo: "../images/countries/spain/spain-img.jpeg",
  },
  {
    name: "United States",
    description:
      "The United States of America (USA), commonly known as the United States (U.S. or US) or America, is a country primarily located in North America, consisting of 50 states, a federal district, five major self-governing territories, and various possessions. At 3.8 million square miles, it is the world's third or fourth-largest country by total area and is slightly smaller than the entire continent of Europe. With a population of over 327 million people, it is the third most populous country in the world. The capital is Washington, D.C., and the most populous city is New York City.",
    photo: "../images/countries/united-states/us-img.jpeg",
  },
];

const seedCountries = () => Country.bulkCreate(countryData);

module.exports = seedCountries;
