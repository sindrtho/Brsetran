import Dao from './dao.js';
import bcrypt from 'bcrypt';

export default class UserDao extends Dao {
	getUser(username, callback) {
		super.query("SELECT *, bruker_id IN (SELECT * FROM admin) AS isAdmin FROM bruker WHERE brukernavn=?", [username], callback);
	}

	getAll(callback) {
		super.query("SELECT *, bruker_id IN (SELECT * FROM admin) AS admin FROM bruker", [], callback);
	}

	login(username, password, callback) {
		super.query("SELECT brukernavn, passord, fornavn, etternavn, bruker_id IN (SELECT * FROM admin) AS isAdmin FROM bruker WHERE brukernavn=?", [username], (status, data) => {
			if(data[0]) {
				bcrypt.compare(password, data[0].passord, (err, result) => {
					if(result) {
						callback(200, data);
					} else {
						callback(401, {error: "Ugyldig brukernavn/passord kombinasjon."})
					}
				});
			} else {
				callback(401, {error: "Ugyldig brukernavn/passord kombinasjon."})
			}
		});
	}

	newUser(user, callback) {
		var data = [user.fornavn, user.etternavn, user.brukernavn, user.passord];
		super.query("INSERT INTO bruker (fornavn, etternavn, brukernavn, passord) VALUES (?, ?, ?, ?)", data, callback);
	}

	newAdmin(id, callback) {
		super.query("INSERT INTO admin VALUES (?)", [id], callback);
	}

	delUser(id, callback) {
		super.query("DELETE FROM bruker WHERE bruker_id=?", [id], callback);
	}

	delAdmin(id, callback) {
		super.query("DELETE FROM admin WHERE bruker_id=?", [id], callback);
	}
}