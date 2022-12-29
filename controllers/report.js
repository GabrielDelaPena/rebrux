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

    console.log("USER REPORTS FETCHED.");
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
