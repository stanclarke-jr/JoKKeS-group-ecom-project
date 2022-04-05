const { MongoClient } = require("mongodb");
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

// Insert companies & items into MongoDB
const batchImport = async () => {
  await client.connect();

  try {
    await db.collection("items").insertMany(items);

    console.log("Done! Successfully imported file.");
  } catch (error) {
    console.log(error.stack);
  }
  client.close();
  console.log("Disconnected");
};

batchImport();
