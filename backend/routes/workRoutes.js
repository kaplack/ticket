const express = require("express");
const router = express.Router();
const {
  getWorks,
  getWork,
  createWorks,
  updateWork,
  deleteWork,
  getAllWorks,
  getPublicWork,
  getAllWorksPaginated,
  getWorksByEmployer,
} = require("../controllers/workController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getWorks).post(protect, createWorks);

router.route("/allpaginated").get(getAllWorksPaginated);
router.route("/all").get(getAllWorks);
router.route("/all/:id").get(getPublicWork);
router
  .route("/:id")
  .get(protect, getWork)
  .put(protect, updateWork)
  .delete(protect, deleteWork);
router.route("/work/:id").get(protect, getPublicWork);
router.route("/employer/:userId/list").get(protect, getWorksByEmployer);
module.exports = router;
