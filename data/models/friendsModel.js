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
  return db("users")
    .where({ name })
    .first();
}

function update(id, user) {
  return db("users")
    .where({ id })
    .update(user);
}
function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

async function insert(user) {
  if (process.env.NODE_ENV === "production") {
    const [newUser] = await db("users").insert(user, ["id"]);
    return findById(newUser.id);
  } else {
    const [id] = await db("users").insert(user);
    return findById(id);
  }
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
