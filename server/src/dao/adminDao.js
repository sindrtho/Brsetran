import Dao from './dao.js';

export default class AdminDao extends Dao {
	getOne(id, callback) {
		super.query("SELECT admin_id, first_name, last_name, username, tlf FROM admin JOIN sjafor ON sjafor_id=admin_id WHERE admin_id=?", [id], callback);
	}
}