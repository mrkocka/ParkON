const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");

router.post("/create-guard", isLoggedIn, isAdmin, adminController.createGuard);

module.exports = router;
