const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const items = require("./data/items.json");
// const companies = require("./data/companies.json");

const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, options);
const db = client.db("JoKKes");
console.log("Connected!");

const bodyLocationBatchImport = async () => {
  await client.connect();

  try {
    // Iterate over items, get body_location value, get rid of duplicates, create an object with _id & body_location key value pairs. Then, insert resulting documents into MongoDB
    const bodyLocation = items.map((item) => item.body_location);
    const bodyLocationSet = new Set(bodyLocation);
    const uniqueLocations = [...bodyLocationSet];
    const bodyLocationsDocs = uniqueLocations.map((body_location, _id) => ({ _id: uuidv4(), body_location }));

    await db.collection("body_locations").insertMany(bodyLocationsDocs);

    console.log("Done! Successfully imported file.");
  } catch (error) {
    console.log(error.stack);
  }
  client.close();
  console.log("Disconnected");
};

bodyLocationBatchImport();
