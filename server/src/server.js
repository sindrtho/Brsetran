import express from 'express';
import config from '../config.js';
import AdminDao from './dao/adminDao.js';
import OppdragDao from './dao/oppdragDao.js';
import path from 'path';
import bodyParser from 'body-parser';

export function create_app(pool) {
	const app = express();

	const publicpath = path.join(__dirname, '/../../client/public');

	const admindao = new AdminDao(pool);
	const oppdragdao = new OppdragDao(pool);

	app.use(express.static(publicpath));
	
	// Finn administrator
	app.get('/admin/:id', (req, res) => {
		admindao.getOne(req.params.id, (status, data) => {
			if(data[0]) {
				res.status(status);
				res.json(data);
			} else {
				res.status(404).send("User not found");
			}
		});
	});

	// Hent alle oppdrag
	app.get("/mission", (req, res) => {
		oppdragdao.getAll((status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	app.get("/mission/nodate", (req, res) => {
		console.log("Kommer inn i API");
		oppdragdao.getNoDates((status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	app.get("/mission/bydate/:date", (req, res) => {
		oppdragdao.getByDate(req.params.date, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Hent ett oppdrag
	app.get("/mission/byid/:id", (req, res) => {
		oppdragdao.getOne(req.params.id, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Nytt oppdrag
	app.post('/mission', (req, res) => {
		let newAssignment = {
			'tittel': req.body.tittel,
			'beskrivelse': req.body.beskrivelse,
			'rute': req.body.rute
		};
		oppdragdao.addAssignment(newAssignment, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Oppdrag er ferdig
	app.put('/mission/:id/ferdig', (req, res) => {
		oppdragdao.doneAssignment(req.params.id, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	app.get('*', (req, res) => {
		res.sendFile(path.join(publicpath, 'index.html'));
	});

	return app;
}