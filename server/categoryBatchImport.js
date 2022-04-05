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

const categoryBatchImport = async () => {
  await client.connect();

  try {
    // Iterate over categories, get category value, get rid of duplicates, create an object with _id & category key value pairs. Then, insert resulting documents into MongoDB
    const categories = items.map((item) => item.category);
    const categorySet = new Set(categories);
    const uniqueCategories = [...categorySet];
    const categoryDocs = uniqueCategories.map((category, _id) => ({ _id: uuidv4(), category }));

    await db.collection("categories").insertMany(categoryDocs);

    console.log("Done! Successfully imported file.");
  } catch (error) {
    console.log(error.stack);
  }
  client.close();
  console.log("Disconnected");
};

categoryBatchImport();
