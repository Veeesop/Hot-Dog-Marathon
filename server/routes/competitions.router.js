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
  const sqlQueryInsert = (players) => {
    let queryInsert = [];
    for (let i = 0; i < players.length; i++) {
      queryInsert.push(`($${i + 2}, $1)`);
    }
    return queryInsert.join();
  };
  let queryValues = sqlQueryInsert(req.body.players);

  const sqlParamsInsert = (players, comp_id) => {
    let paramsInsert = [comp_id];
    for (let i = 0; i < players.length; i++) {
      paramsInsert.push(players[i].id);
    }
    return paramsInsert;
  };

  const sqlQuery = `
      INSERT INTO competitions_users (user_id, competition_id)
      VALUES ${queryValues} 
     `;
  const sqlParams = sqlParamsInsert(req.body.players, req.body.competition_id);
  pool
    .query(sqlQuery, sqlParams)
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

router.get("/dogCount/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT count(hotdogs.id) dog_count, "user".username, "user".id, "user".profile_image FROM "hotdogs"
  JOIN competitions_users ON competitions_users.user_id = "hotdogs".user_id
  JOIN competitions ON competitions_users.competition_id = competitions.id
  JOIN "user" ON competitions_users.user_id = "user".id
  WHERE competitions.id = $1 AND (hotdogs.time_added > competitions.start_time) AND (hotdogs.time_added < competitions.end_date)
  GROUP BY "user".username, "user".id, "user".profile_image
  ORDER BY dog_count DESC;
  `;

  const sqlParams = [req.params.id];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("Error in Get", err);
      res.sendStatus(500);
    });
});

router.put("/winner/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    UPDATE competitions
    SET winner = $1
    WHERE competitions.id = $2;
  `;

  const sqlParams = [req.body.winner.username, Number(req.params.id)];
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in Put", err);
      res.sendStatus(500);
    });
});

module.exports = router;
