const express = require("express");
const router = express.Router();
const Users = require("../../data/Models/usersModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// router.post("/register", async (req, res, next) => {
//   try {
//     const creds = req.body;
//     console.log(creds);
//     //creds.password = bcrypt.hashSync(creds.password, 10);
//     creds.password = bcrypt.hashSync(creds.password, 10);
//     const user = await Users.insert(creds);
//     const token = generateToken(user);
//     res.status(201).json({ id: user.id, token });
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user)
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.getBy(username)
  .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ message: "invalid creds" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});



module.exports = router;
