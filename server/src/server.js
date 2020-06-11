import express from 'express';
import config from '../config.js';
import AdminDao from './dao/adminDao.js';

export function create_app(pool) {
	const app = express();

	const admindao = new AdminDao(pool);

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
	return app;
}