const request = require('supertest');
const server = require("../api/server");
const supertest = require("supertest");

describe("testing tests", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });

  describe("GET/", () => {
    it("responds with 200 ok", () => {
      return supertest(server)
        .get("/")
        .expect(200);
    });

    it("responses are in json format", () => {
      return supertest(server)
        .get("/")
        .expect("Content-Type", /json/i);
    });

    it("responds {api: 'is alive'}", async () => {
      await supertest(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual({ api: "is alive" });
        });
    });
  });
});