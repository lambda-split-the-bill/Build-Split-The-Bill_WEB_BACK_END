const db = require("../dbConfig");

module.exports = {
  get,
  getById,
  getBy,
  insert,
  update,
  remove
};

function get() {
  return db("friends");
}
function getById(id) {
  return db("friends")
    .where({ id })
    .first();
}
// function getBy(filter) {
//   return db("users")
//     .where(filter)
//     .first();
// }

function getBy(name) {
  return db("friends")
    .where({ name })
    .first();
}

function update(id, friend) {
  return db("friends")
    .where({ id })
    .update(friend);
}
function remove(id) {
  return db("friends")
    .where({ id })
    .del();
}

async function insert(friend) {
  if (process.env.NODE_ENV === "production") {
    const [newFriend] = await db("friends").insert(friend, ["id"]);
    return findById(newFriend.id);
  } else {
    const [id] = await db("friends").insert(friend);
    return findById(id);
  }
}

function findById(id) {
  return db("friends")
    .where({ id })
    .first();
}
