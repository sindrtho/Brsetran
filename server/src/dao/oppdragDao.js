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

	getByMonth(month, callback) {
		console.log(date);
		super.query("SELECT * FROM oppdrag NATURAL JOIN rute WHERE month(dato)=?", [month], callback);
	}

	addAssignment(json, callback) {
		var vals = [
			json.tittel,
			json.beskrivelse,
			json.rute_id,
			json.dato
		];
		super.query("INSERT INTO oppdrag (tittel, beskrivelse, rute_id, dato) VALUES (?, ?, ?, ?)", vals, callback);
	}

	doneAssignment(id, callback) {
		super.query("UPDATE oppdrag SET utfort=1 WHERE oppdrag_id=?", [id], callback);
	}

	ChangeDate(id, date, callback) {
		super.query("UPDATE oppdrag SET date=? WHERE oppdrag_id=?", [date, id], callback);
	}

	addPrice(id, price, callback) {
		super.query("UPDATE oppdrag SET price=? WHERE oppdrag_id=?", [price, id], callback)
		return -1;
	}

	getRoutes(callback) {
		super.query("SELECT * FROM rute", [], callback);
	}
}