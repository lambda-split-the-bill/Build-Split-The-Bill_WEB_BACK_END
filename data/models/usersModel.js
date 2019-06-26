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
  return db("users");
}
function getById(id) {
  return db("users")
    .where({ id })
    .first();
}
// function getBy(filter) {
//   return db("users")
//     .where(filter)
//     .first();
// }

function getBy(username) {
  return db("users")
    .where({username})
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
  const [id] = await db('users').insert(user, ["id"]);
  console.log("id", id)
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
