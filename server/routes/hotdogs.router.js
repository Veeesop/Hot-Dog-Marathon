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

router.get("/comp/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT hotdogs.rating as rating, hotdogs.id as id, hotdogs.photo as photo, hotdogs.user_id as user_id, competitions.name as comp_name FROM "hotdogs"
  JOIN competitions_users ON competitions_users.user_id = "hotdogs".user_id
  JOIN competitions ON competitions_users.competition_id = competitions.id
  WHERE competitions.id = $1 AND (hotdogs.time_added > competitions.start_time) AND (hotdogs.time_added < competitions.end_date);
  `;
  const sqlParams = [req.params.id];
  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("Error in GET", err);
      res.sendStatus(500);
    });
});

module.exports = router;
