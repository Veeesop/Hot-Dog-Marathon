
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE "user";

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    profile_image VARCHAR,
    description VARCHAR
);

DROP TABLE "hotdogs";

CREATE TABLE "hotdogs" (
	id SERIAL PRIMARY KEY,
	rating int NOT NULL,
	photo varchar NOT NULL,
	description varchar NOT NULL,
	user_id int references "user" NOT NULL,
	probability decimal NOT NULL,
	time_added timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE "competitions";

CREATE TABLE "competitions" (
	id serial primary key NOT NULL,
	name varchar NOT NULL UNIQUE,
	end_date DATE NOT NULL,
	start_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	description varchar NOT NULL,
	admin_user_id int NOT NULL,
	admin_user_username varchar NOT NULL,
	winner varchar DEFAULT NULL
);

DROP TABLE "competitions_users";

CREATE TABLE competitions_users (
	id SERIAL PRIMARY KEY,
	user_id int references "user",
	competition_id int references competitions
);

--Get all users from a competition
SELECT * FROM "user"
JOIN competitions_users ON competitions_users.user_id = "user".id
JOIN competitions ON competitions_users.competition_id = competitions.id
WHERE competitions.id = 1;


--Get all hotdogs from a competition
SELECT hotdogs.rating as rating, hotdogs.id as id, hotdogs.photo as photo, hotdogs.user_id as user_id, competitions.name as comp_name, hotdogs.description as description, "user".username, hotdogs.time_added, "user".profile_image FROM "hotdogs"
JOIN competitions_users ON competitions_users.user_id = "hotdogs".user_id
JOIN competitions ON competitions_users.competition_id = competitions.id
JOIN "user" ON competitions_users.user_id = "user".id
WHERE competitions.id = 4 AND (hotdogs.time_added > competitions.start_time) AND (hotdogs.time_added < competitions.end_date)
ORDER BY hotdogs.time_added DESC;

--Get all user competitions
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
WHERE "user".id = 2;

--Get users for the The Competition
SELECT json_agg("user".username) as players, competitions.id FROM "user"
JOIN competitions_users ON competitions_users.user_id = "user".id
JOIN competitions ON competitions_users.competition_id = competitions.id
GROUP BY competitions.id;

--Get info for competition
SELECT  competitions.id, json_agg("user".username) as users, competitions.admin_user_id, 
	competitions.description, 
	competitions.admin_user_username, 
	competitions.end_date, 
	competitions.winner,
	competitions.name,
	competitions.start_time FROM competitions
JOIN competitions_users ON competitions.id = competitions_users.competition_id
JOIN "user" ON "user".id = competitions_users.user_id
WHERE competitions.id = 4
GROUP BY competitions.id;


--Get suspicious hotdogs
SELECT hotdogs.id as id, hotdogs.rating as rating, hotdogs.description as description, hotdogs.time_added as time_added, hotdogs.photo as photo, hotdogs.probability as probability, hotdogs.user_id as user_id, competitions.admin_user_id FROM "hotdogs"
JOIN competitions_users ON competitions_users.user_id = "hotdogs".user_id
JOIN competitions ON competitions_users.competition_id = competitions.id
WHERE competitions.id = 4 AND ("hotdogs".probability < .5);

--Approve suspicious hotdogs
UPDATE "hotdogs"
SET probability = .99
WHERE id = 41;

--Delete suspicious hotdogs
DELETE FROM "hotdogs"
WHERE id = 40;


--user hotdog count in competition
SELECT count(hotdogs.id), "user".username, "user".id, "user".profile_image FROM "hotdogs"
JOIN competitions_users ON competitions_users.user_id = "hotdogs".user_id
JOIN competitions ON competitions_users.competition_id = competitions.id
JOIN "user" ON competitions_users.user_id = "user".id
WHERE competitions.id = 4 AND (hotdogs.time_added > competitions.start_time) AND (hotdogs.time_added < competitions.end_date)
GROUP BY "user".username, "user".id, "user".profile_image;

