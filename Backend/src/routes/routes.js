const {Router} = require("express");
const authenticate = require("../middleware/authenticate");
const {getAll, getById, register, login} = require("../controllers/controllers");

const router = Router();

// Get
router.get("/search", getAll);
router.get("/search/:id", getById);
//Post
router.post("/sign-up", register);
router.post("/sign-in", login);
//router.post("/auth", authenticate, authorize);

router.post("/auth", authenticate, (req, res) => {
    try {
      
      res.status(200).send({isAuthenticated: true});
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error: error.message, isAuthenticated: false});
    }
  });

module.exports = router;
