const router = require("express").Router();
const jobsController = require("../../controllers/jobsController");

// Matches with "/api/jobs"
router.route("/")
  .get(jobsController.findAll)
  .post(jobsController.create);

// Matches with "/api/jobs/:id"
router
  .route("/:id")
  .get(jobsController.findById)
  .put(jobsController.update)
  .delete(jobsController.remove);

router.route("/upvote/:id")
  .post(jobsController.incrementUpvote);
//router.route("/downvote/:id", post(jobsController.incrementDownvote);
// Matches with "/api/jobs/uid/:id"
router
  .route("/uid/:uid")
  .get(jobsController.findByUid)

module.exports = router;
