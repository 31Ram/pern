// Archivo con las urls, endpoints
const { signIn } = require('../controllers/controllers');
const { Router } = require("express");
const pool = require("../db");
const router = Router();

router.get("/sign-in", (req, res) => {
  //const { email, password } = req.body;
 pool.query('select * from user_info', (error, res) => {
  //console.log(tt);  
  res.json(result.rows);
})
});

router.get("/h", function (req, res) {
  pool
    .query("SELECT * FROM user_info")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

router.get("/users/1", (req, res) => {
  res.send("Single user");
});

router.post("/users", (req, res) => {
  res.send("Post users");
});

router.delete("/users", (req, res) => {
  res.send("Delete users");
});

router.put("/users", (req, res) => {
  res.send("Update users");
});

module.exports = router;
