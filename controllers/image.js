// const Image = require("../models/Image");

// exports.addImage = async (req, res) => {
//   const name = req.body.name;
//   const bitmap = req.body.bitmap;

//   const image = new Image({
//     name: name,
//     bitmap: bitmap,
//   });

//   try {
//     await image.save();
//     res.status(200).send(`Image save ${image}`);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server error, fixing it...");
//   }
// };
