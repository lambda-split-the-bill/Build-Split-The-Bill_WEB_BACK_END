const db = require("../data/dbConfig.js");
const { insert, remove } = require("../data/models/friendsModel.js");

describe("friends model", () => {
  beforeEach(async () => {
    await db("friends").truncate();
  });

  describe("insert()", () => {
    it("should add a new friend", async () => {
      await insert({ name: "Goofy", email: "goofy@disney.com" });
      const friends = await db("friends");
      expect(friends).toHaveLength(1);
    });

    it("should insert the provided friend", async () => {
      let friend = { name: "Bugs", email: "bugs@wb.com" };
      const inserted = await insert(friend);
      expect(inserted.name).toBe(friend.name);
    });
  });
});