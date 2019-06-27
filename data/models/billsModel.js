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
  return db("bills");
}
function getById(id) {
  return db("bills")
    .where({ id })
    .first();
}
// function getBy(filter) {
//   return db("users")
//     .where(filter)
//     .first();
// }

function getBy(name) {
  return db("bills")
    .where({ name })
    .first();
}

function update(id, bill) {
  return db("bills")
    .where({ id })
    .update(bill);
}
function remove(id) {
  return db("bills")
    .where({ id })
    .del();
}

async function insert(bill) {
  if (process.env.NODE_ENV === "production") {
    const [newBill] = await db("bills").insert(bill, ["id"]);
    return findById(newBill.id);
  } else {
    const [id] = await db("bills").insert(bill);
    return findById(id);
  }
}

function findById(id) {
  return db("bills")
    .where({ id })
    .first();
}
