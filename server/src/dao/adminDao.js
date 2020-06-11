import Dao from './dao.js';

export default class AdminDao extends Dao {
	getOne(id, callback) {
		super.query("SELECT id, name FROM admin WHERE id=?", [id], callback);
	}
}