const db = require("./../models");
const User = db.user;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.FullName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    FullName: req.body.FullName,
    Email: req.body.Email,
    DateOfBrith: req.body.DateOfBrith,
    Password: req.body.Password,
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const FullName = req.query.FullName;
  var condition = FullName ? { FullName: { $regex: new RegExp(FullName), $options: "i" } } : {};
  

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

//Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  user.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// exports.GetUserByEmail=(name,callback) =>{
//   connection.query('SELECT * from clients where Nom = ? ',[name,callback] , (err, rows) =>{
//       if (err) throw err
//       callback(rows)
//   })
// }

// find user with Email

exports.findByEmail = (req, res) => {
  const Email = req.params.Email;

  User.findOne({ Email : req.body.email , Password : req.body.password })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + Email });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + Email });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  user.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  user.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} user were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all published Tutorials

exports.findAllPublished = (req, res) => {
  
  User.findAll({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// exports.GetUserByEmail=function(user,callback){
// const query={Email:Email}
// user.findOne(query,callback)

// }
