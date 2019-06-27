exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("bills")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bills").insert([
        {
          resturant: "Restaurant 1",
          numofFriend: 4,
          total: 125.08,
          split: 6
        },
        {
          resturant: "Restaurant 2",
          numofFriend: 8,
          total: 278.18,
          split: 6
        },
        {
          resturant: "Restaurant 3",
          numofFriend: 12,
          total: 594.78,
          split: 6
        }
      ]);
    });
};
