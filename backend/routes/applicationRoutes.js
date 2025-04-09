const express = require("express");
const router = express.Router();
const {} = require("../controllers/workController");

const { protect } = require("../middleware/authMiddleware");

router.route("/application").post(protect, createApplication);

router
  .route("/application/:id")
  .get(protect, getApplication)
  .delete(protect, deleteApplication)
  .put(protect, updateApplication);
router.get("/application/my", protect, getMyApplications);
router.get("/application/bywork/:workId", protect, getApplicationsByWork);
module.exports = router;
