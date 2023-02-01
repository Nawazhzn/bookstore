const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth", () => {
  describe("/POST signup", () => {
    it("it should create a new user", (done) => {
      const user = {
        username: "testuser",
        email: "testuser@test.com",
        password: "testpassword",
      };
      chai
        .request(server)
        .post("/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("User created successfully");
          done();
        });
    });
  });
});
