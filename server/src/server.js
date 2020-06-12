import express from 'express';
import config from '../config.js';
import AdminDao from './dao/adminDao.js';
import OppdragDao from './dao/oppdragDao.js';

export function create_app(pool) {
	const app = express();

	const admindao = new AdminDao(pool);
	const oppdragdao = new OppdragDao(pool);

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
	app.get("/oppdrag", (req, res) => {
		oppdragdao.getAll((status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Hent ett oppdrag
	app.get("/oppdrag/:id", (req, res) => {
		oppdragdao.getOne(req.params.id, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Nytt oppdrag
	app.post('/oppdrag', (req, res) => {
		let newAssignment = {
			'beskrivelse': req.body.beskrivelse,
			'kunde_id': req.body.kunde_id,
			'fra': req.body.fra,
			'til': req.body.til
		};
		oppdragdao.addAssignment(newAssignment, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	// Oppdrag er ferdig
	app.put('/oppdrag/:id/ferdig', (req, res) => {
		oppdragdao.doneAssignment(req.params.id, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	return app;
}