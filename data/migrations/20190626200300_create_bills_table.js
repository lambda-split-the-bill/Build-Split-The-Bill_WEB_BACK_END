exports.up = function(knex) {
  return knex.schema.createTable("bills", bills => {
    bills.increments();

    bills.string("location", 128).notNullable();
    bills.string("date", 128).notNullable();
    bills.string("total", 128).notNullable();
    bills.string("groupsize", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("bills");
};
