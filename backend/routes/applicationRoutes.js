const express = require("express");
const router = express.Router();
const {
  createApplication,
  updateApplication,
  getApplication,
  deleteApplication,
  getMyApplications,
  getApplicationsByWork,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createApplication);

router
  .route("/item/:id")
  .get(protect, getApplication)
  .delete(protect, deleteApplication)
  .put(protect, updateApplication);
router.get("/my", protect, getMyApplications);
router.get("/bywork/:workId", protect, getApplicationsByWork);
module.exports = router;
