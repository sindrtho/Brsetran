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

	changeDate(id, date, callback) {
		super.query("UPDATE oppdrag SET dato=? WHERE oppdrag_id=?", [date, id], callback);
	}

	changePrice(id, price, callback) {
		super.query("UPDATE oppdrag SET pris=? WHERE oppdrag_id=?", [price, id], callback)
	}

	getRoutes(callback) {
		super.query("SELECT * FROM rute", [], callback);
	}
}