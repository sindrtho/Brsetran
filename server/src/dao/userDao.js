import Dao from './dao.js';

export default class UserDao extends Dao {
	getOne(id, callback) {
		super.query("SELECT id, name FROM users WHERE id=?", [id], callback);
	}
}