const Report = require("../models/Report");
const User = require("../models/User");

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    console.log("REPORTS FETCHED");
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.createReport = async (req, res, next) => {
  const reportExist = await Report.findOne({
    street: req.body.street,
    city: req.body.city,
  });

  if (reportExist) {
    return res.status(400).send("This report already been reported.");
  }

  const userExist = await User.findOne({ _id: req.body.creator });
  if (!userExist) {
    return res.status(400).send("User does not exist.");
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const report = new Report({
    creator: req.body.creator,
    image: req.body.image,
    description: req.body.description,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    cleaned: false,
    lat: req.body.lat,
    lng: req.body.lng,
    createdAt: today,
  });

  try {
    const savedReport = await report.save();
    console.log("REPORT ADDED");
    res
      .status(200)
      .send(
        `You have successfully reported new report with the id ${savedReport._id}`
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.getReportsByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const reports = await Report.find({ creator: userId });
    if (reports.length == 0) {
      return res.status(400).send("No reports for this user.");
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send("User does not exist.");
    }

    for (let i = 0; i < reports.length; i++) {
      reports[i].creator = user.username;
    }

    console.log("USER REPORTS FETCHED.");
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.getReportById = async (req, res) => {
  const reportId = req.params.reportId;

  try {
    const report = await Report.findOne({ _id: reportId });
    if (!report) {
      return res.status(400).send("Reports not found.");
    }

    const user = await User.findOne({ _id: report.creator });
    if (!user) {
      return res.status(400).send("User does not exist.");
    }

    report.creator = user.username;

    console.log("SINGLE REPORT FETCHED.");
    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.deleteReportById = async (req, res) => {
  const reportID = req.params.reportID;

  try {
    const report = await Report.findOne({ _id: reportID });
    if (!report) {
      return res.status(400).send("Reports not found.");
    }

    await Report.findByIdAndRemove(report._id);
    console.log("REPORT DELETED");
    res.status(200).send("Report deleted.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.isCleanedReport = async (req, res) => {
  const reportID = req.body.reportID;

  try {
    const report = await Report.findOne({ _id: reportID });
    if (!report) {
      return res.status(400).send("Reports not found.");
    }

    report.cleaned = true;
    await report.save();
    console.log("REPORT IS CLEANED");
    res.status(200).send("Report is cleaned.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
