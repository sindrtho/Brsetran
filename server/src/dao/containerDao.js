import Dao from './dao.js';

export default class ContainerDao extends Dao {
	addOne(id, callback) {
		super.query("INSERT INTO container VALUES ?", [id], callback);
	}

	findAvailable(callback) {
		super.query("SELECT * FROM container WHERE container_id NOT IN (SELECT container_id FROM container NATURAL JOIN container_utleie NATURAL JOIN oppdrag WHERE utfort=0);", [], callback);
	}

	assignContainer(container_id, assignment_id, callback) {
		super.query("INSERT INTO container_utleie VALUES (?, ?)", [container_id, assignment_id], callback);
	}

	getContainerFromAssignment(assignment_id, callback) {
		super.query("SELECT container_id FROM container_utleie WHERE oppdrag_id=?", [assignment_id], callback);
	}
}