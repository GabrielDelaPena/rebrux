const router = require("express").Router();

const reportController = require("../controllers/report");

router.get("/", reportController.getReports);

router.get("/:userId", reportController.getReportsByUserId);

router.get("/report/:reportId", reportController.getReportById);

router.post("/new", reportController.createReport);

router.post("/delete/:reportID", reportController.deleteReportById);

router.post("/cleaned", reportController.isCleanedReport);

module.exports = router;
