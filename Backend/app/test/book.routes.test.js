const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Book = require("../app/models/book.model");

chai.use(chaiHttp);
chai.should();

describe("Books", () => {
  beforeEach(done => {
    Book.deleteMany({}, err => {
      done();
    });
  });

  describe("/GET books", () => {
    it("it should GET all the books", done => {
      chai
        .request(app)
        .get("/api/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST book", () => {
    it("it should not POST a book without pages field", done => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954
      };
      chai
        .request(app)
        .post("/api/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("pages");
          res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
    });
  });
});