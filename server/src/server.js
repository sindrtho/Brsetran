import express from 'express';
import config from '../config.js';

export function create_app() {
	const app = express();

	app.get('/user', (req, res) => {
		res.status(200);
		res.send({'Result': 'Positive'});
	});
/*
	Se at bruker er administrator før noe skjer. Bruke admin brukernavn til å logge inn i database.
	app.post("/newworker", (req, res) => {
		let altconfig = config.mysql;
		altconfig.user = req.username;
		let altpool = mysql.create_pool(altconfig);
	});

	app.post("/newadmin", (req, res) => {

	});
*/
	return app;
}