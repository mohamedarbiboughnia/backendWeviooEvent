module.exports = app => {
    const users = require("./../controllers/userController.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all user
    router.get("/", users.findAll);
  
    // Retrieve all published user
    router.get("/published", users.findAllPublished);
  
    // Retrieve a single user with id
    //router.get("/:id", users.findOne);

    // Retrieve a single user with Email
    router.post("/login", users.findByEmail);
  
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Create a new user
    router.delete("/", users.deleteAll);
  
    app.use("/api/user", router);
  };