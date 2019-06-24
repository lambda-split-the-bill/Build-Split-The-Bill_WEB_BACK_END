
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("users", field => {
      field.increments();
      field
        .string("username", 50)
        .notNullable()
        .unique();
      field.string("password", 1000);
      field
        .string("roles", 50)
        .defaultTo("Regular")
        .notNullable();
    })
 
};

exports.down = function(knex, Promise) {return knex.schema
    .dropTableIfExists("users");
};