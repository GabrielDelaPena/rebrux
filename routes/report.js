const router = require("express").Router();

const reportController = require("../controllers/report");

router.get("/", reportController.getReports);

router.post("/new", reportController.createReport);

router.get("/:userId", reportController.getReportsByUserId);

module.exports = router;
