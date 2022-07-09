const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get("/all", (req, res) => {
  const sqlQuery = `
    SELECT id, username FROM "user"
    ORDER BY username ASC
  `;
  pool
    .query(sqlQuery)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("error in GET", err);
    });
});

router.post("/profilePhoto", async (req, res) => {
  try {
    const profile_image = req.body.profile_image;
    // console.log(profile_image);
    const uploadedResponse = await cloudinary.uploader.upload(profile_image, {
      upload_preset: "profiles",
    });
    console.log(uploadedResponse.url);
    res.send(uploadedResponse.url);
  } catch (err) {
    console.log("Error in POST", err);
    res.sendStatus(500);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const profile_image = req.body.profile_image;
  const description = req.body.description;

  const queryText = `INSERT INTO "user" (username, password, profile_image, description)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, profile_image, description])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
