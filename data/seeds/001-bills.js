
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bills').del()
    .then(function () {
      // Inserts seed entries
      return knex('bills').insert([
        {
          name: "Promotion!",
          location: "Johnny's Grill",
          date: "11/12/2016",
          groupsize: 6,
          total: 210.15,


        },
         {
          name: "Birthday",
          location: "Parlor",
          date: "9/24/2019",
          groupsize: 4,
          total: 150.87,
        },
        {
          name: "Celebration",
          location: "Pier 45",
          date: "1/19/2019",
          groupsize: 15,
          total: 517.32,
        }
      ]);
    });
};
