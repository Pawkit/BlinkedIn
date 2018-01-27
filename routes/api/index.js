const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const jobRoutes = require("./jobs");

// Routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
