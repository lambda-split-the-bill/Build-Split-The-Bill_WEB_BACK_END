
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {
          name: "friend1",
          email: "friend1@gmail.com",
        },
        {
          name: "friend2",
          email: "friend2@gmail.com",
        },
        {
          name: "friend3",
          email: "friend3@gmail.com",
        }
      ]);
    });
};
