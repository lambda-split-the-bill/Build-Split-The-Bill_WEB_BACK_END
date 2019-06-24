exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "User1",
          password: "password",
          roles: "admin"
        },
        {
          username: "User2",
          password: "password",
          roles: "admin"
        },
        {
          username: "User3",
          password: "password",
          roles: "admin"
        }
      ]);
    });
};
