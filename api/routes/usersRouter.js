const express = require("express");
const router = express.Router();
const Users = require("../../data/models/usersModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/register", (req, res) => {
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
      res.status(500).json({error: err.message, message: "500 error in login" });
    });
});


router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


server.put('/:id', (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(error => {
      res.status(500).json(error)
  })
})


module.exports = router;
