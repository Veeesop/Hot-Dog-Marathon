const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/photo", rejectUnauthenticated, async (req, res) => {
  try {
    const hotDogImage = req.body.photo;
    // console.log(hotDogImage);
    const uploadedResponse = await cloudinary.uploader.upload(hotDogImage, {
      upload_preset: "hotdogs",
    });
    console.log(uploadedResponse.url);
    res.send(uploadedResponse.url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

router.post("/database", rejectUnauthenticated, (req, res) => {
  const dog = req.body;
  const sqlQuery = `
    INSERT INTO hotdogs (description, photo, user_id, rating, probability)
    VALUES ($1, $2, $3, $4, $5)
    `;

  const sqlParams = [
    dog.description,
    dog.photo,
    dog.user_id,
    dog.rating,
    dog.probability,
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error in POST", err);
      res.sendStatus(500);
    });
});

module.exports = router;
