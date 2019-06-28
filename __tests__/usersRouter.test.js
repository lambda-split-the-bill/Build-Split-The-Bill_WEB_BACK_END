const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig.js");
const Users = require("../data/models/friendsModel.js");

describe("usersRoutes", () => {
  describe("/GET", () => {
    it("should return 200 ok", async () => {
      const res = await request(server).get("/api/auth");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    it("respond with 404 when nothing is sent through", () => {
      return request(server)
        .post("/api/auth/register/user")
        .expect(404);
    });

    it("POST /", async () => {
      const user = { username: "Goofy", passowrd: "password" };
      const res = await request(user)
        .post("/api/auth/register/user")
        .send(user);
      expect(res.status).toEqual(200);
    });
  });

  describe("DELETE /", async () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
 
    it("should respond with a 204 status when user is successfully deleted", async () => {
      let users = { name: "Goofy" };
      await request(server)
        .post("/")
        .send(users);

      let res = await request(server).delete("/1");
      expect(res.status).toEqual(200);
    });
  });

});

