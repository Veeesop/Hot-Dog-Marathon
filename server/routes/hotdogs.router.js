const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { cloudinary } = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  try {
    const hotDogImage = req.body.photo;
    const uploadedResponse = await cloudinary.uploader.upload(hotDogImage, {
      upload_preset: "hotdogs",
    });
    console.log(uploadedResponse);
    res.json({ msg: "YEAH UPLOADED" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

module.exports = router;
