const express = require("express");
const router = express.Router();
const { createShortUrl, getShortUrl } = require("./controller");

router.route("/").post(createShortUrl);
router.route("/:index").get(getShortUrl);

module.exports = router;
