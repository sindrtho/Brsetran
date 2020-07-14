import express from 'express';
import config from '../config.js';
import UserDao from './dao/userDao.js';
import OppdragDao from './dao/oppdragDao.js';
import path from 'path';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

export function create_app(pool) {
	const app = express();

	const publicpath = path.join(__dirname, '/../../client/public');

	const oppdragdao = new OppdragDao(pool);
	const userdao = new UserDao(pool);

	app.use(express.static(publicpath, {index: false}));
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

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

	app.get("/routes", (req, res) => {
		oppdragdao.getRoutes((status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	app.get("/isadmin", (req, res) => {
		var token = req.cookies.authtoken;
		if(token) {
			jwt.verify(token, config.secret, (err, decompiled) => {
				if(err) {
					console.log(err);
					res.status(500).send("Iternal server error");
				} else {
					console.log(decompiled);
					decompiled.logged=true;
					res.status(200);
					res.json(decompiled);
				}
			})
		} else {
			res.status(200)
			res.json({logged: false, admin: false});
		}
	});

	// Nytt oppdrag
	app.post('/mission', (req, res) => {
		console.log(req.cookies)
		let newAssignment = {
			'tittel': req.body.tittel,
			'beskrivelse': req.body.beskrivelse,
			'rute_id': req.body.rute.split(" ")[0],
			'dato': req.body.dato
		};
		oppdragdao.addAssignment(newAssignment, (status, data) => {
			res.status(status);
			res.redirect('/ukeliste');
		});
	});

	app.post('/login', (req, res) => {
		userdao.login(req.body.brukernavn, req.body.passord, (status, data) => {
			if(status==200) {
				console.log(data[0])
				const user = {
					brukernavn: data[0].brukernavn,
					fornavn: data[0].fornavn,
					etternavn: data[0].etternavn,
					admin: data[0].isAdmin==1
				};
				jwt.sign(user, config.secret, {expiresIn: '30d'}, (err, token) => {
					res.status(status);
					res.cookie('authtoken', token, {httpOnly: true, maxAge: 1000*60*60*24*7});
					res.json(token);
				});
			} else {
				res.status(status);
				res.redirect('/login');
			}
		});
	});

	app.post('/logout', (req, res) => {
		if(req.cookies.authtoken) {
			res.status(200);
			res.cookie('authtoken', null, {maxAge: 0});
			res.redirect('/login');
		} else {
			res.status(200);
			res.redirect('/login');
		}
	});

	app.post('/newUser', (req, res) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.passord, salt, (err, hash) => {
				var newUser = {
					"fornavn": req.body.fornavn,
					"etternavn": req.body.etternavn,
					"brukernavn": req.body.brukernavn,
					"passord": hash
				};
				userdao.newUser(newUser, (status, data) => {
					console.log(data);
					if(req.body.nyadmin) {
						console.log("Ny admin lagt til");
						userdao.newAdmin(data.insertId, (finalStatus, finalData) => {
							res.status(finalStatus);
							res.redirect('/');
						});
					} else {
						res.status(status);
						res.redirect('/');
					}
				});
			});
		});
	});


	// Oppdrag er ferdig
	app.put('/mission/done/:id', (req, res) => {
		oppdragdao.doneAssignment(req.params.id, (status, data) => {
			res.status(status);
			res.json(data);
		});
	});

	app.put("/mission/changedate/:id", (req, res) => {
		oppdragdao.changeDate(req.params.id, req.body.date, (status, data) => {
			res.status(status);
			res.json(data);
		})
	});

	app.put("/mission/changeprice/:id", (req, res) => {
		oppdragdao.changePrice(req.params.id, req.body.price, (status, data) => {
			res.status(status);
			res.json(data);
		})
	});


	app.get('/login', (req, res) => {
		if(req.cookies.authtoken) {
			res.status(302);
			res.redirect('/');
		}
		res.sendFile(path.join(publicpath, 'index.html'));
	});

	app.use('*', function (req, res, next) {
		if(req.cookies.authtoken) {
			next();
		} else {
			res.redirect('/login');
		}
	});

	app.get('*', (req, res) => {
		var token = req.cookies.authtoken;
		res.sendFile(path.join(publicpath, 'index.html'));
	});

	return app;
}