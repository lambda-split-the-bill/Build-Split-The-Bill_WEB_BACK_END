exports.up = function(knex) {
    return knex.schema.createTable("bills", bills => {
      bills.increments();
  
      bills.string("resturant", 128).notNullable();
      bills.string("numofFriend", 128).notNullable();
      bills.string("total", 128).notNullable();
      bills.string("split", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("bills");
  };
  