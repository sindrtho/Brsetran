import Dao from './dao.js';			

export default class OppdragDao extends Dao {
	getOne(id, callback) {
		super.query("SELECT * FROM oppdrag NATURAL JOIN rute WHERE oppdrag_id=?", [id], callback);
	}

	getAll(callback) {
		super.query("SELECT * FROM oppdrag NATURAL JOIN rute", [], callback);
	}

	getByDate(date, callback) {
		console.log(date);
		super.query("SELECT * FROM oppdrag NATURAL JOIN rute WHERE dato=?", [date], callback);
	}

	addAssignment(json, callback) {
		// TODO
		return -1;
	}

	doneAssignment(id, callback) {
		super.query("UPDATE oppdrag SET utfort=1 WHERE oppdrag_id=?", [id], callback);
	}

	addDate(id, date, callback) {
		super.query("UPDATE frakt SET dato=? WEHRE id=?", [date, id], callback);
	}

	addPrice() {
		//TODO
		return -1;
	}
}