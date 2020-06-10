import express from 'express';
import config from '../config.js';
import UserDao from './dao/userDao.js';

export function create_app(pool) {
	const app = express();

	const userdao = new UserDao(pool);

	app.get('/user/:id', (req, res) => {
		userdao.getOne(req.params.id, (status, data) => {
			if(data[0]) {
				res.status(status);
				res.json(data);
			} else {
				res.status(404).send("User not found");
			}
		});
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