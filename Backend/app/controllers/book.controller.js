const { Books } = require("../models");
const db = require("../models");
const books = db.Books;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Book
    const books = new Books({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      year: req.body.year,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Book in the database
    books
      .save(books)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Books.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Book with id=${id}. Book was not found!`
          });
        } else res.send({ message: "Book was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
  };


//Delete Single Object 
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Books.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Books with id=${id}. Maybe Book was not found!`
          });
        } else {
          res.send({
            message: "Books was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };

  //Delete All Objects

  exports.deleteAll = (req, res) => {
    Books.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Books were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
  };
  
  //Find all objects

  exports.findAllPublished = (req, res) => {
    Books.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving books."
        });
      });
  };