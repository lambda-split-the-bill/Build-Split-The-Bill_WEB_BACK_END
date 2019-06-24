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
  
router.post("/register", async (req, res, next) => {
  try {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 10);
    const user = await Users.insert(creds);
    const token = generateToken(user);
    res.status(201).json({ id: user.id, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ id: user.id, token });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;