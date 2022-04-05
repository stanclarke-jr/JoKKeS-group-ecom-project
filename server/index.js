"use strict";

const express = require("express");
const morgan = require("morgan");
const PORT = 4000;

// Import handler functions
const {
  getItem,
  getItems,
  getCategories,
  getCategory,
  getBodyLocations,
  getBodyLocation,
  getCompanies,
  getCompany,
  updateBodyLocation,
  updateCategory,
  updateItem,
  updateCompany,
  updateItems,
  deleteItems,
  getCategoryById,
  getItemById,
  getCompanyById,
  updateStockById,
  addOrder,
  addUser,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /* ************************ GET ENDPOINTS ************************ */
  // ITEMS
  .get("/api/items", getItems) // ? category=fitness, body_location=wrist
  .get("/api/items/:itemId", getItem)
  //.get("/api/items/:itemId", getItemById)

  //CATEGORIES
  .get("/api/categories", getCategories)
  .get("/api/categories/:categoryId", getCategory)
  //.get("/api/categories/:categoryId", getCategoryById)

  //COMPANIES
  .get("/api/companies", getCompanies)
  .get("/api/companies/:companyId", getCompany)
  //.get("/api/companies/:companyId", getCompanyById)

  //BODY_LOCATIONS
  .get("/api/body-locations", getBodyLocations)
  .get("/api/body-locations/:body_locationId", getBodyLocation)

  /* ************************ PATCH ENDPOINTS ************************ */
  // ITEMS
  //.patch("/api/items/:itemId", updateStockById)
  .patch("/api/items/:itemId", updateItem)

  //CATEGORIES
  // Update category (for adding images later) by ID -> to search by name add query param "?search="name"
  // categories/fitness?search="name"
  .patch("/api/categories/:match", updateCategory)

  //COMPANIES
  .patch("/api/companies/:match", updateCompany)

  //BODY_LOCATIONS
  .patch("/api/body-locations/:match", updateBodyLocation)

  ///--- DELETE ENDPOINTS --- ///
  // ITEMS
  .delete("/api/items", deleteItems)

  ///--- POST ENDPOINTS --- ///
  //ORDERS
  .post("/api/checkout", addOrder)

  //USERS
  .post("/api/users", addUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
