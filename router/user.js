const router = require("express").Router();
const { login } = require("../controller/user/auth");

router
  .route("/")
  .post(login);

module.exports = router;
