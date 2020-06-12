import Dao from './dao.js';			

const CONTAINER_UTLEIE = 0;
const FRAKT = 1;

export default class OppdragDao extends Dao {
	getOne(id, callback) {
		super.query("SELECT * FROM oppdrag NATURAL JOIN kunde NATURAL JOIN sjafor WHERE oppdrag_id=?", [id], callback);
	}

	getAll(callback) {
		super.query("SELECT * FROM oppdrag NATURAL JOIN kunde NATURAL JOIN sjafor", [], callback);
	}

	addAssignment(json, callback) {
		var val = [
			json.beskrivelse,
			json.kunde_id,
			json.fra,
			json.til

		]
		super.query("INSERT INTO oppdrag (beskrivelse, kunde_id, fra, til) VALUES (?, ?, ?, ?)", val, callback)
	}


	assignDriver(id, sjafor_id, callback) {
		super.query("UPDATE oppdrag SET sjafor_id=? WHERE oppdrag_id=?", [sjafor_id, id], callback);
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