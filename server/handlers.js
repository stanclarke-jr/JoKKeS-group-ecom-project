"use strict";

const { v4: uuidv4 } = require("uuid");
//MongoDB client
const { MongoClient } = require("mongodb");

//Connection string
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create mongo client
const client = new MongoClient(MONGO_URI, options);
const db = client.db("JoKKes");

const { createDBdata, readDBdata, deleteDBdata, updateDBdata } = require("./crud");

/* ************************ GET /api/categories ************************
 *    Simple GET request.
 *      - Query Params:  NONE
 *      - Path Params: NONE
 *    Response: {
 *      status: 200, 500, 404
 *      error:  false, true
 *      message: <description of what happened>
 *      filter: <filters applied to search>___DEFAULT: null
 *      start: <start position of search>_____DEFAULT: null
 *      limit: <max results to return>________DEFAULT: 25
 *      total: <amt of categories found>
 *      data: [ { _id: <string>, category: <string>}, ... ]
 *    }
 */
const getCategories = async (req, res) => {
  const response = await readDBdata("categories");
  res.status(response.status).json(response);
};

/* ************************ /api/categories/:categoryId ************************
 *    Simple GET request.
 *      - Query Params:  NONE
 *      - Path Params: <categoryId>
 *    Response: {
 *      status: 200, 400, 404
 *      message: <description of what happened>
 *      data: onSuccess: { _id: <string>, category: <string> }
 *            onFail: undefined
 *    }
 */
const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await client.connect();

    const categoryData = await db.collection("categories").findOne({ _id: categoryId });

    !Object.values(categoryData).length
      ? res.status(404).json({
          status: 404,
          message: `Category not found`,
        })
      : res.status(200).json({
          status: 200,
          data: categoryData,
          message: "Successfully retrieved category",
        });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
    console.log(error.stack);
  }
};

/* ************************ /api/items? ************************
 *    Complex GET request.
 *      - Query Params:  OPTIONAL. any property of an item. Ex. category=fitness
 *      - Path Params: NONE
 *    Response: {
 *      status: 200, 400, 404
 *      message: <description of what happened>
 *      data: onSuccess: { _id: <string>, category: <string> }
 *            onFail: undefined
 *    }
 */
const getItems = async (req, res) => {
  const filter = {};
  if (Object.keys(req.query).length) {
    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === "string") filter[key] = { $regex: value, $options: "i" };
      else filter[key] = value;
    }
  }
  const filters = { limit: 0, filter };

  const response = await readDBdata("items", filters);
  res.status(response.status).json(response);
};

const getItemById = async (req, res) => {
  const { itemId } = req.params;

  try {
    await client.connect();

    const itemData = await db.collection("items").findOne({ _id: parseInt(itemId) });

    !Object.values(itemData).length
      ? res.status(404).json({
          status: 404,
          message: `Item not found`,
        })
      : res.status(200).json({
          status: 200,
          data: itemData,
          message: "Successfully retrieved item",
        });
  } catch (error) {
    res.status(400).json({ status: 400, message: "Failed to retrieve item" });
    console.log(error.stack);
  }
};

const getBodyLocations = async (req, res) => {
  const response = await readDBdata("body_locations");
  res.status(response.status).json(response);
};

const getCompanies = async (req, res) => {
  const response = await readDBdata("companies");
  res.status(response.status).json(response);
};

const getCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    await client.connect();

    const companyData = await db.collection("companies").findOne({ _id: parseInt(companyId) });

    !Object.values(companyData).length
      ? res.status(404).json({
          status: 404,
          message: `Company not found`,
        })
      : res.status(200).json({
          status: 200,
          data: companyData,
          message: "Successfully retrieved company",
        });
  } catch (error) {
    res.status(400).json({ status: 400, message: "Failed to retrieve company" });
    console.log(error.stack);
  }
};

const updateStockById = async (req, res) => {
  const { itemId } = req.params;
  const newStockLevel = req.body.numInStock;

  try {
    await client.connect();

    const updatedStock = await db.collection("items").updateOne({ _id: parseInt(itemId) }, { $set: { numInStock: newStockLevel } });

    console.log(updatedStock);

    if (updatedStock.modifiedCount === 1) {
      console.log(updatedStock);
      console.log(newStockLevel);
      res.status(200).json({
        status: 200,
        data: updatedStock,
        message: `Successfully updated stock level to ${newStockLevel}`,
      });
    } else
      res.status(400).json({
        status: 400,
        data: updatedStock,
        message: "Failed to update stock level",
      });
  } catch (error) {
    console.log(error.stack);
    res.status(400).json({
      status: 400,
      message: `Failed to update reservation: ${error.message}`,
    });
  } finally {
    client.close();
  }
};

const addUser = async (req, res) => {
  const userData = req.body;

  try {
    await client.connect();

    await db.collection("users").insertOne({ _id: uuidv4(), ...userData });
    if (!userData || !firstName || !lastName || !address || !city || !province || !postalCode || !country || !email) {
      return res.status(400).json({
        status: 400,
        data: userData,
        message: "Failed request",
      });
    } else
      res.status(200).json({
        status: 200,
        data: userData,
        success: "Successfully added user",
      });
  } catch (error) {
    console.log(error.stack);
  }
};

/* ******************************  KVJ  ****************************** */

/* ***************  Helpers  *************** */

//Find ID of an item using a search obj { "name" : "XXXX"}
const getDBitemID = async (collName, { searchObj }) => {
  const result = await readDBdata(collName, searchObj);

  if (result.status !== 200) {
    //ERROR
    return { message: "ERROR: Could not get data from DB", result, search: searchObj };
  } else {
    if (Array.isArray(result.data)) {
      //ERROR, filter not specific enough
      return { message: "ERROR: Multiple items returned. Filter must be more specific", result, search: searchObj };
    } else {
      return result.data._id;
    }
  }
};

//Create valid body to update an ITEM
const itemUpdateData = async (toUpdate) => {
  //Properties not able to update
  let myWarnings = [];

  //Create update data
  const newItemData = {
    newValue: {},
  };

  if (Object.keys(toUpdate).includes("name")) newItemData.newValue.name = toUpdate.name;
  if (Object.keys(toUpdate).includes("price")) newItemData.newValue.price = toUpdate.price;
  if (Object.keys(toUpdate).includes("numInStock")) newItemData.newValue.numInStock = toUpdate.numInStock;
  if (Object.keys(toUpdate).includes("imageSrc")) newItemData.newValue.imageSrc = toUpdate.imageSrc;
  if (Object.keys(toUpdate).includes("body_locationID")) newItemData.newValue.body_location = toUpdate.body_locationID;
  if (Object.keys(toUpdate).includes("companyID")) newItemData.newValue.imageSrc = toUpdate.companyID;
  if (Object.keys(toUpdate).includes("categoryID")) newItemData.newValue.imageSrc = toUpdate.categoryID;

  //UPDATE RELATIONSHIP PROPERTIES with unknown ids
  if (Object.keys(toUpdate).includes("body_location")) {
    let body_locationID = await getDBitemID("body_locations", { name: toUpdate.body_location });
    if (typeof body_locationID === "object") {
      myWarnings.push(`Could not get ID of body_location named ${toUpdate.body_location}. This property was not updated.`);
    } else newItemData.newValue.body_locationID = body_locationID;
  }

  if (Object.keys(toUpdate).includes("company")) {
    let companyID = await getDBitemID("companies", { name: toUpdate.company });
    if (typeof companyID === "object") {
      myWarnings.push(`Could not get ID of company named ${toUpdate.company}. This property was not updated.`);
    } else newItemData.newValue.companyID = companyID;
  }

  if (Object.keys(toUpdate).includes("category")) {
    let categoryID = await getDBitemID("categories", { name: toUpdate.category });
    if (typeof categoryID === "object") {
      myWarnings.push(`Could not get ID of category named ${toUpdate.category}. This property was not updated.`);
    } else newItemData.newValue.categoryID = categoryID;
  }

  return { newItemData, myWarnings };
};

/* ***************  Endpoint Handlers  *************** */

const getItem = async (req, res) => {
  //get Item by ID (as int)
  const itemID = req.params.itemId;
  console.log(`Item ID as ${typeof itemID}`, itemID);

  // { filter: <filter by ?>}
  const response = await readDBdata("items", { filter: { _id: Number(itemID) } });

  res.status(response.status).json(response);
};

const getCategory = async (req, res) => {
  //get Category by ID (as string)
  const categoryID = req.params.categoryId;
  console.log(`Category ID as ${typeof categoryID}`, categoryID);

  const response = await readDBdata("categories", { filter: { _id: categoryID } });

  res.status(response.status).json(response);
};

const getCompany = async (req, res) => {
  //get Company by ID (as string)
  const companyID = req.params.companyId;
  console.log(`Company ID as ${typeof companyID}`, companyID);

  const response = await readDBdata("companies", { filter: { _id: Number(companyID) } });

  res.status(response.status).json(response);
};

const getBodyLocation = async (req, res) => {
  //get Body Location by ID (as string)
  const body_locationID = req.params.body_locationId;
  console.log(`Body Location ID as ${typeof body_locationID}`, body_locationID);

  const response = await readDBdata("body_locations", { filter: { _id: body_locationID } });

  res.status(response.status).json(response);
};

//BODY: { keys = itemIDs, value = newData to insert}
const updateItems = async (req, res) => {
  //Update all items at the same, but wait for all of them for resolve/reject.
  const myItemsToUpdate = Array.from(Object.entries(req.body)); //[ ["34234234234",{ "numInStock": 5}], ["sdfsdf": { "numInStock": 7}] ]
  const myPromises = myItemsToUpdate.map(([itemID, toUpdate]) => {
    const { newItemData, myWarnings } = itemUpdateData(toUpdate);
    return updateDBdata("items", itemID, newItemData); //await ?
  });

  const response = Promise.allSettled(myPromises);

  res.status(response.status).json({ ...response, warnings: myWarnings });
};

const updateItem = async (req, res) => {
  //Get item ID from Path and Update data
  const itemID = req.params.itemId;

  const { newItemData, myWarnings } = itemUpdateData(req.body);

  const response = await updateDBdata("items", itemID, newItemData);

  res.status(response.status).json({ ...response, warnings: myWarnings });
};

const deleteItems = async (req, res) => {
  const response = await deleteDBdata("items");
  res.status(response.status).json(response);
};

const updateCategory = async (req, res) => {
  //Get Update data { field: value}
  const toUpdate = req.body;
  const value = req.params.match; //match name or id
  const key = req.query?.search ?? "_id";

  //create filter (by name or id)
  const filter = {};
  if (typeof value === "string") filter[key] = { $regex: value, $options: "i" };
  else filter[key] = value;

  //Create update data
  const newCategoryData = {
    newValue: {},
  };

  //if updating both name and category.
  if (Object.keys(toUpdate).includes("name") && Object.keys(toUpdate).includes("category")) {
    newCategoryData.newValue.name = toUpdate.name;
    newCategoryData.newValue.category = toUpdate.category;
  }
  //new name only? update category also
  else if (Object.keys(toUpdate).includes("name")) {
    newCategoryData.newValue.name = toUpdate.name;
    newCategoryData.newValue.category = toUpdate.name;
  }
  //new category only  update name also
  else if (Object.keys(toUpdate).includes("category")) {
    newCategoryData.newValue.name = toUpdate.category;
    newCategoryData.newValue.category = toUpdate.category;
  }

  if (Object.keys(toUpdate).includes("imageSrc")) newCategoryData.newValue.imageSrc = toUpdate.imageSrc;

  const response = await updateDBdata("categories", filter, newCategoryData);

  res.status(response.status).json(response);
};

const updateCompany = async (req, res) => {
  //Get Update data { field: value}
  const toUpdate = req.body;
  const value = req.params.match; //match name or id
  const key = req.query?.search ?? "_id";

  //create filter (by name or id)
  const filter = {};
  if (typeof value === "string") filter[key] = { $regex: value, $options: "i" };
  else filter[key] = value;

  //Create update data
  const newCategoryData = {
    newValue: {},
  };

  //if updating both name and category.
  if (Object.keys(toUpdate).includes("name") && Object.keys(toUpdate).includes("category")) {
    newCategoryData.newValue.name = toUpdate.name;
    newCategoryData.newValue.category = toUpdate.category;
  }
  //new name only? update category also
  else if (Object.keys(toUpdate).includes("name")) {
    newCategoryData.newValue.name = toUpdate.name;
    newCategoryData.newValue.category = toUpdate.name;
  }
  //new category only  update name also
  else if (Object.keys(toUpdate).includes("category")) {
    newCategoryData.newValue.name = toUpdate.category;
    newCategoryData.newValue.category = toUpdate.category;
  }

  if (Object.keys(toUpdate).includes("imageSrc")) newCategoryData.newValue.imageSrc = toUpdate.imageSrc;

  const response = await updateDBdata("categories", filter, newCategoryData);

  res.status(response.status).json(response);
};

const updateBodyLocation = async (req, res) => {
  //Get Update data { field: value}
  const toUpdate = req.body;
  const value = req.params.match; //match name or id
  const key = req.query?.search ?? "_id";

  //create filter (by name or id)
  const filter = {};
  if (typeof value === "string") filter[key] = { $regex: value, $options: "i" };
  else filter[key] = value;

  //Create update data
  const newBodyLocData = {
    newValue: {},
  };

  //if updating both name and body location.
  if (Object.keys(toUpdate).includes("name") && Object.keys(toUpdate).includes("body_location")) {
    newBodyLocData.newValue.name = toUpdate.name;
    newBodyLocData.newValue.body_location = toUpdate.body_location;
  }
  //new name only? update body location also
  else if (Object.keys(toUpdate).includes("name")) {
    newBodyLocData.newValue.name = toUpdate.name;
    newBodyLocData.newValue.body_location = toUpdate.name;
  }
  //new body location only  update name also
  else if (Object.keys(toUpdate).includes("body_location")) {
    newBodyLocData.newValue.name = toUpdate.body_location;
    newBodyLocData.newValue.body_location = toUpdate.body_location;
  }

  const response = await updateDBdata("body_locations", filter, newBodyLocData);

  res.status(response.status).json(response);
};

const addOrder = async (req, res) => {
  const orderDetails = req.body;
  /*   const userDetails = orderDetails.user;
  let response, userCreate, userUpdate, createOrder;
  const newUser = {
    _id: uuidv4(),
    ...userDetails,
    paymentMethods: new Set([orderDetails.payment]),
    savedLocations: new Set([orderDetails.savedLocations]),
    orders: new Set([orderDetails._id]),
  }; 
  userCreate = await createDBdata("users", newUser);*/
  const response = await createDBdata("orders", orderDetails);
  //let status = userCreate.error || createOrder.error ? 400 : 201;
  /* //find user via Email
  const userExists = await readDBdata("users", { filter: { email: userDetails.email } });

  if (userExists.error) response = userExists;
  else {
    //user exists?
    if (userExists.status != 200) {
      //no, create
      

      userCreate = await createDBdata("users", newUser);
      if (userCreate.error) response = userCreate;
      else {
        createOrder = await createDBdata("orders", orderDetails);
      }
    } else {
      //Yes, update
      let updateData = userExists.data;
      updateData.paymentMethods.add(orderDetails.payment);
      updateData.savedLocations.add(orderDetails.savedLocations);
      updateData.orders.push(orderDetails._id);

      userUpdate = updateDBdata("users", {});
      if (userUpdate.error) response = userUpdate;
      else {
        createOrder = await createDBdata("orders", orderDetails);
      }
    }
  } */
  res.status(response.status).json(response);
};

module.exports = {
  getItem,
  getItems,
  getCategories,
  getCategory,
  getBodyLocations,
  getBodyLocation,
  getCompanies,
  getCompany,
  updateCompany,
  updateCategory,
  updateBodyLocation,
  updateItem,
  updateItems,
  deleteItems,
  getCategoryById,
  getItemById,
  getCompanyById,
  updateStockById,
  addOrder,
  addUser,
};
