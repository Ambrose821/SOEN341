const express = require("express");
const router = express.Router();

//This will return the home page because we need this to acess it 
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
