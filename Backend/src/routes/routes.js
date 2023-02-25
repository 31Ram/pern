const {Router} = require("express");
const {getAll, getById, createUser, sign_in} = require("../controllers/controllers");

const router = Router();

router.get("/users", getAll);

router.get("/users/:id", getById);

router.post("/sign-up", createUser);

router.post("/sign-in", sign_in);

module.exports = router;
