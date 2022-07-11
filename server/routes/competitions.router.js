const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/", rejectUnauthenticated, (req, res) => {
  const comp = req.body;
  const sqlQuery = `
        INSERT INTO competitions (name, end_date, description, admin_user_id, admin_user_username)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

  const sqlParams = [
    comp.name,
    comp.end_date,
    comp.description,
    comp.admin_user_id,
    comp.admin_user_username,
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbres) => {
      res.send(dbres);
    })
    .catch((err) => {
      console.log("Error in POST", err);
      res.sendStatus(500);
    });
});

router.post("/junction", rejectUnauthenticated, (req, res) => {
  let str = [];
  const getInsert = (players, comp_id) => {
    players.map((player) => {
      str.push(`(${player.id}, ${comp_id})`);
    });
  };
  getInsert(req.body.players, req.body.competition_id);
  let sqlValues = str.join();
  console.log(sqlValues);

  const sqlQuery = `
      INSERT INTO competitions_users (user_id, competition_id)
      VALUES ${sqlValues} 
     `;
  const sqlParams = [sqlValues];
  pool
    .query(sqlQuery)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in POST", err);
      res.sendStatus(500);
    });
});

router.get("/user", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT competitions.id, 
	  competitions.admin_user_id, 
	  competitions.description, 
	  competitions.admin_user_username, 
	  competitions.end_date, 
	  competitions.winner,
	  competitions.name,
	  competitions.start_time
	FROM "competitions"
  JOIN competitions_users ON competitions_users.competition_id = "competitions".id
  JOIN "user" ON competitions_users.user_id = "user".id
  WHERE "user".id = $1;
  `;
  const sqlParams = [req.user.id];
  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("error in GET", err);
      res.sendStatus(500);
    });
});

router.get("/compInfo/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT  competitions.id, json_agg("user".username) as users, competitions.admin_user_id, 
	competitions.description, 
	competitions.admin_user_username, 
	competitions.end_date, 
	competitions.winner,
	competitions.name,
	competitions.start_time FROM competitions
  JOIN competitions_users ON competitions.id = competitions_users.competition_id
  JOIN "user" ON "user".id = competitions_users.user_id
  WHERE competitions.id = $1
  GROUP BY competitions.id;
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
