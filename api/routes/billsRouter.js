const express = require("express");
const router = express.Router();
const Bills = require("../../data/models/billsModel");
//const bcrypt = require("bcryptjs");
const { protected } = require("../middleware/auth");
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const users = await Bills.get();
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

router.post("/", protected, (req, res) => {
  let user = req.body;
  console.log(req);
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({message: "internal server error"});
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
      res.status(500).json({ err, message: "500 error in login" });
    });
});

module.exports = router;
