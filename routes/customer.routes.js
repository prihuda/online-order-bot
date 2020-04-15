module.exports = app => {
  const customer = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customer.create);

  // Get all Customers
  router.get("/", customer.findAll);

  // Get Customer By Id
  router.get("/:id", customer.findOne);

  // Update Customer Data
  router.put("/:id", customer.update);

  // Delete Customer Data
  router.delete("/:id", customer.delete);

  app.use('/api/v1/customer', router);
};
