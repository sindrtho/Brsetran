import axios from 'axios';
//axios.interceptors.response.use(response => response.data);

function config() {
    let token = localStorage.getItem('authToken');
    let Authorization = 'none';
    if(token)
        Authorization = "Bearer " + token;
    return {
        headers: {
            Authorization
        }
    }
}

class BrukerService {
	login(brukernavn, passord) {
		let data = {"brukernavn":brukernavn, "passord":passord};
		return axios.post('/login', data);
	}

	logout() {
		return axios.post('/logout');
	}

	getInfo() {
		return axios.get('/isadmin');
	}

	getAll() {
		return axios.get('/allusers');
	}

	deleteUser(id, admin) {
		return axios.put('/user/remove/'+id, {"admin": admin});
	}
}

export let brukerService = new BrukerService();