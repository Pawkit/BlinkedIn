const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
  .route("/authenticate")
  .post(usersController.authenticate);

router
  .route("/register")
  .post(usersController.register);

module.exports = router;
